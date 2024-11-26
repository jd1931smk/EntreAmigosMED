import { useCartStore } from '../store/cartStore';
import { Button } from './ui/Button';
import { formatCurrency } from '../utils/format';

export const CartSummary = () => {
  const { items, total, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) return null;

  return (
    <div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-beige-600">Your Order</h3>
        <div className="max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <p className="text-beige-600 font-medium">{item.name}</p>
                <p className="text-beige-500">{formatCurrency(item.price * item.quantity)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="px-2 py-1 bg-beige-100 hover:bg-beige-200 text-beige-600"
                >
                  -
                </Button>
                <span className="w-8 text-center text-beige-600">{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-beige-100 hover:bg-beige-200 text-beige-600"
                >
                  +
                </Button>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="danger"
                  className="ml-2 px-2 py-1"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-beige-100">
          <span className="text-lg font-bold text-beige-600">Total:</span>
          <span className="text-lg font-bold text-beige-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};