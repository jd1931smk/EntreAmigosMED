import { Order } from '../types';
import { formatCurrency } from '../utils/format';
import { Button } from './ui/Button';

interface OrderConfirmationProps {
  order: Order;
  onClose: () => void;
}

export const OrderConfirmation = ({ order, onClose }: OrderConfirmationProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-beige-600 mb-2">¡Order Confirmed!</h2>
          <p className="text-beige-500">Thank you for your order.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-cream-50 p-4 rounded-lg">
            <h3 className="font-semibold text-beige-600 mb-2">Order Details</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Order ID:</span> #{order.id}</p>
              <p><span className="font-medium">Name:</span> {order.customerName}</p>
              <p><span className="font-medium">Email:</span> {order.email}</p>
              <p><span className="font-medium">WhatsApp:</span> {order.whatsapp}</p>
              <p><span className="font-medium">Delivery Time:</span> {order.deliveryTime}</p>
              <p><span className="font-medium">Address:</span> {order.address}</p>
              {order.comments && (
                <p><span className="font-medium">Instructions:</span> {order.comments}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-beige-600 mb-2">Items Ordered</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-beige-100 font-bold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={onClose}
            className="w-full bg-beige-500 hover:bg-beige-600 text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};