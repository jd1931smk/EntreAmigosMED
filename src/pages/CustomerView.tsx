import { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useCartStore } from '../store/cartStore';
import { MenuCard } from '../components/MenuCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useForm } from 'react-hook-form';
import { CustomerForm, Order } from '../types';
import { useOrderStore } from '../store/orderStore';
import { CartSummary } from '../components/CartSummary';
import { OrderConfirmation } from '../components/OrderConfirmation';
import { formatCurrency } from '../utils/format';

const generateTimeOptions = () => {
  const options = [];
  const start = 10 * 60 + 30; // 10:30
  const end = 17 * 60; // 17:00
  
  for (let minutes = start; minutes <= end; minutes += 15) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const time = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    options.push(time);
  }
  
  return options;
};

const timeOptions = generateTimeOptions();

export const CustomerView = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const items = useMenuStore((state) => state.items.filter((item) => item.available));
  const { items: cartItems, total, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerForm>();

  const onSubmit = (data: CustomerForm) => {
    const order = {
      id: Date.now().toString(),
      customerName: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      address: data.address,
      deliveryTime: data.deliveryTime,
      comments: data.comments,
      items: cartItems,
      status: 'pending' as const,
      total,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    setConfirmedOrder(order);
    clearCart();
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-32">
      <header className="bg-beige-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-beige-600">Entre Amigos</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showCheckout ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-beige-600">Checkout</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
              />
              <Input
                label="Email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
              />
              <Input
                label="WhatsApp Number"
                {...register('whatsapp', { required: 'WhatsApp number is required' })}
                error={errors.whatsapp?.message}
              />
              <Input
                label="Delivery Address"
                {...register('address', { required: 'Address is required' })}
                error={errors.address?.message}
              />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-beige-600">
                  Delivery Time (10:30 AM - 5:00 PM)
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-beige-500"
                  {...register('deliveryTime', { 
                    required: 'Delivery time is required'
                  })}
                >
                  <option value="">Select a time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.deliveryTime && (
                  <p className="text-sm text-red-500">{errors.deliveryTime.message}</p>
                )}
              </div>
              <Input
                label="Special Instructions (Optional)"
                {...register('comments')}
                as="textarea"
                rows={3}
                className="resize-none"
              />
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-beige-300 text-beige-600 hover:bg-beige-50"
                  onClick={() => setShowCheckout(false)}
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  className="bg-beige-500 hover:bg-beige-600 text-white"
                >
                  Place Order
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
            {cartItems.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-beige-100 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                  <CartSummary />
                  <Button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-beige-500 hover:bg-beige-600 text-white mt-4"
                  >
                    Proceed to Checkout ({formatCurrency(total)})
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {confirmedOrder && (
        <OrderConfirmation 
          order={confirmedOrder} 
          onClose={() => setConfirmedOrder(null)} 
        />
      )}
    </div>
  );
};