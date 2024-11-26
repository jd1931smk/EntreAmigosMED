import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem } from '../types';
import { ImageStorage } from '../services/imageStorage';

interface MenuState {
  items: MenuItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  toggleAvailability: (id: string) => void;
  updateItem: (id: string, item: Partial<MenuItem>) => void;
  deleteItem: (id: string) => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      items: [
        {
          id: '1',
          name: 'Signature Burger',
          description: 'Handcrafted beef patty with special sauce',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
          available: true,
        },
        {
          id: '2',
          name: 'Fresh Garden Salad',
          description: 'Mixed greens with house dressing',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
          available: true,
        },
      ],
      addItem: (item) => {
        if (item.image.startsWith('data:')) {
          const imageId = `img_${item.id}`;
          ImageStorage.saveImage(imageId, item.image);
          item.image = imageId;
        }
        set((state) => ({ items: [...state.items, item] }));
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      toggleAvailability: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, available: !item.available } : item
          ),
        })),
      updateItem: (id, updatedItem) => {
        if (updatedItem.image?.startsWith('data:')) {
          const imageId = `img_${id}`;
          ImageStorage.saveImage(imageId, updatedItem.image);
          updatedItem.image = imageId;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          ),
        }));
      },
      deleteItem: (id) => {
        ImageStorage.deleteImage(`img_${id}`);
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: 'restaurant-menu',
    }
  )
);