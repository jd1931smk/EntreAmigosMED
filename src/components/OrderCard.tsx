import { Order } from '../types';
import { Button } from './ui/Button';
import { formatCurrency } from '../utils/format';

interface OrderCardProps {
  order: Order;
  onUpdateStatus?: (id: string, status: Order['status']) => void;
}

export const OrderCard = ({ order, onUpdateStatus }: OrderCardProps) => {
  const statusColors = {
    pending: 'bg-cream-200 text-beige-600',
    ready: 'bg-cream-300 text-beige-600',
    dispatched: 'bg-cream-400 text-beige-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-beige-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-beige-600">{order.customerName}</h3>
          <p className="text-beige-500">Email: {order.email}</p>
          <p className="text-beige-500">WhatsApp: {order.whatsapp}</p>
          <p className="text-beige-500">Delivery: {order.deliveryTime}</p>
          <p className="text-beige-500">Address: {order.address}</p>
          {order.comments && (
            <p className="text-beige-500 mt-2">
              <span className="font-medium">Instructions:</span> {order.comments}
            </p>
          )}
        </div>
        <span className={`px-4 py-2 rounded-full ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-beige-600">Order Items:</h4>
        <ul className="mt-3 space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between text-beige-500">
              <span>{item.name} x{item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-beige-100">
          <div className="flex justify-between font-bold text-beige-600">
            <span>Total:</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      {onUpdateStatus && order.status !== 'dispatched' && (
        <div className="mt-6 flex justify-end space-x-2">
          {order.status === 'pending' && (
            <Button
              className="bg-beige-500 hover:bg-beige-600 text-white"
              onClick={() => onUpdateStatus(order.id, 'ready')}
            >
              Mark as Ready
            </Button>
          )}
          {order.status === 'ready' && (
            <Button
              className="bg-beige-500 hover:bg-beige-600 text-white"
              onClick={() => onUpdateStatus(order.id, 'dispatched')}
            >
              Mark as Dispatched
            </Button>
          )}
        </div>
      )}
    </div>
  );
};