import { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useOrderStore } from '../store/orderStore';
import { MenuCard } from '../components/MenuCard';
import { OrderCard } from '../components/OrderCard';
import { MenuItem } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ImageUpload } from '../components/ImageUpload';
import { useForm } from 'react-hook-form';

interface MenuItemForm {
  name: string;
  description: string;
  price: string;
}

export const AdminView = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  
  const { items, addItem, updateItem, toggleAvailability, deleteItem } = useMenuStore();
  const { orders, updateOrderStatus } = useOrderStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<MenuItemForm>();

  const onSubmit = (data: MenuItemForm) => {
    if (!imageUrl) {
      alert('Please upload an image');
      return;
    }

    const item: MenuItem = {
      id: editingItem?.id || Date.now().toString(),
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      image: imageUrl,
      available: true,
    };

    if (editingItem?.id) {
      updateItem(editingItem.id, item);
    } else {
      addItem(item);
    }
    
    setEditingItem(null);
    setImageUrl('');
    reset();
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setImageUrl(item.image);
    setValue('name', item.name);
    setValue('description', item.description);
    setValue('price', item.price.toString());
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-beige-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-beige-600">Entre Amigos Dashboard</h1>
            <div className="space-x-2">
              <Button
                variant={activeTab === 'orders' ? 'primary' : 'outline'}
                className={activeTab === 'orders' 
                  ? 'bg-beige-500 hover:bg-beige-600 text-white'
                  : 'border-beige-300 text-beige-600 hover:bg-beige-50'
                }
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </Button>
              <Button
                variant={activeTab === 'menu' ? 'primary' : 'outline'}
                className={activeTab === 'menu'
                  ? 'bg-beige-500 hover:bg-beige-600 text-white'
                  : 'border-beige-300 text-beige-600 hover:bg-beige-50'
                }
                onClick={() => setActiveTab('menu')}
              >
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'orders' ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={updateOrderStatus}
              />
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Button 
                onClick={() => {
                  setEditingItem({} as MenuItem);
                  setImageUrl('');
                  reset();
                }}
                className="bg-beige-500 hover:bg-beige-600 text-white"
              >
                Add New Item
              </Button>
            </div>

            {editingItem && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-2xl font-semibold mb-6 text-beige-600">
                    {editingItem.id ? 'Edit Item' : 'Add New Item'}
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                      label="Name"
                      {...register('name', { required: 'Name is required' })}
                      error={errors.name?.message}
                    />
                    <Input
                      label="Description"
                      {...register('description', { required: 'Description is required' })}
                      error={errors.description?.message}
                    />
                    <Input
                      label="Price"
                      type="number"
                      step="0.01"
                      {...register('price', { 
                        required: 'Price is required',
                        min: { value: 0.01, message: 'Price must be greater than 0' }
                      })}
                      error={errors.price?.message}
                    />
                    <ImageUpload
                      onImageSelect={setImageUrl}
                      defaultImage={imageUrl || editingItem.image}
                    />
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-beige-300 text-beige-600 hover:bg-beige-50"
                        onClick={() => {
                          setEditingItem(null);
                          setImageUrl('');
                          reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-beige-500 hover:bg-beige-600 text-white"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  isAdmin
                  onEdit={handleEdit}
                  onToggleAvailability={toggleAvailability}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};