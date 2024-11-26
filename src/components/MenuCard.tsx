import { MenuItem } from '../types';
import { Button } from './ui/Button';
import { useCartStore } from '../store/cartStore';
import { ImageStorage } from '../services/imageStorage';
import { formatCurrency } from '../utils/format';

interface MenuCardProps {
  item: MenuItem;
  isAdmin?: boolean;
  onEdit?: (item: MenuItem) => void;
  onToggleAvailability?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const MenuCard = ({
  item,
  isAdmin,
  onEdit,
  onToggleAvailability,
  onDelete,
}: MenuCardProps) => {
  const addToCart = useCartStore((state) => state.addItem);

  const getImageUrl = (image: string) => {
    if (image.startsWith('http')) return image;
    const storedImage = ImageStorage.getImage(image);
    return storedImage || image;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100">
      <img
        src={getImageUrl(item.image)}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-beige-600">{item.name}</h3>
        <p className="text-beige-500 mt-1">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-beige-600">{formatCurrency(item.price)}</span>
          {isAdmin ? (
            <div className="space-x-2">
              <Button
                variant="outline"
                className="border-beige-300 text-beige-600 hover:bg-beige-50"
                onClick={() => onEdit?.(item)}
              >
                Edit
              </Button>
              <Button
                variant={item.available ? 'danger' : 'primary'}
                className={item.available 
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-beige-500 hover:bg-beige-600'
                }
                onClick={() => onToggleAvailability?.(item.id)}
              >
                {item.available ? 'Disable' : 'Enable'}
              </Button>
              <Button
                variant="danger"
                className="bg-red-500 hover:bg-red-600"
                onClick={() => onDelete?.(item.id)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button
              disabled={!item.available}
              className={item.available 
                ? 'bg-beige-500 hover:bg-beige-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
              onClick={() => addToCart(item)}
            >
              {item.available ? 'Add to Cart' : 'Unavailable'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};