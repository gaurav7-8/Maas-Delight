import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();

// Mock Initial Dishes
const INITIAL_DISHES = [
  {
    id: 'dish-1',
    name: 'Neon Truffle Tagliatelle',
    description: 'Fresh homemade egg pasta tossed in a luxurious black truffle and parmesan butter sauce, topped with edible gold leaf.',
    price: 24.99,
    chefId: 'chef-1',
    chefName: 'Chef Evelyn Vane',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=600',
    category: 'Pasta',
    prepTime: '20 mins',
    rating: 4.9,
    reviewsCount: 124,
    dietary: ['Vegetarian'],
    isPopular: true,
    availableCount: 15
  },
  {
    id: 'dish-2',
    name: 'Cyber Ramen Royale',
    description: '24-hour slow-cooked pork belly broth, customized wheat noodles, marinated soft-boiled egg, fresh scallions, nori, and house-made neon chili oil.',
    price: 18.50,
    chefId: 'chef-2',
    chefName: 'Chef Marcus Kenji',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600',
    category: 'Ramen',
    prepTime: '15 mins',
    rating: 4.8,
    reviewsCount: 312,
    dietary: [],
    isPopular: true,
    availableCount: 30
  },
  {
    id: 'dish-3',
    name: 'Vibrant Avocado Zen Bowl',
    description: 'Organic quinoa, hand-massaged purple kale, avocado fan, heirloom tomatoes, roasted chickpeas, and wild turmeric ginger drizzle.',
    price: 16.00,
    chefId: 'chef-1',
    chefName: 'Chef Evelyn Vane',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    category: 'Salad',
    prepTime: '10 mins',
    rating: 4.7,
    reviewsCount: 88,
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    isPopular: false,
    availableCount: 20
  },
  {
    id: 'dish-4',
    name: 'Matcha Moss Glass Dessert',
    description: 'Delicate layers of ceremonial grade matcha mousse, pistachio crumble, sponge biscuit, and sweet white chocolate fog.',
    price: 12.00,
    chefId: 'chef-3',
    chefName: 'Chef Amelie Laurent',
    image: 'https://images.unsplash.com/photo-1536680465769-2365207b035e?auto=format&fit=crop&q=80&w=600',
    category: 'Desserts',
    prepTime: '25 mins',
    rating: 4.9,
    reviewsCount: 156,
    dietary: ['Vegetarian'],
    isPopular: true,
    availableCount: 10
  },
  {
    id: 'dish-5',
    name: 'Crispy Neon Taco Blast',
    description: 'Blue corn hand-pressed tortillas, pulled jackfruit birria, fresh cilantro, neon lime salsa, and coconut cream dip.',
    price: 14.99,
    chefId: 'chef-3',
    chefName: 'Chef Amelie Laurent',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
    category: 'Tacos',
    prepTime: '12 mins',
    rating: 4.6,
    reviewsCount: 95,
    dietary: ['Vegetarian', 'Vegan', 'Dairy-Free'],
    isPopular: false,
    availableCount: 25
  },
  {
    id: 'dish-6',
    name: 'Smoked Bourbon BBQ Ribs',
    description: 'Fall-off-the-bone tender baby back ribs glazed in a rich, sweet homemade smoked bourbon barbecue sauce, served with roasted sweet potato wedges.',
    price: 26.99,
    chefId: 'chef-2',
    chefName: 'Chef Marcus Kenji',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    category: 'Ribs',
    prepTime: '30 mins',
    rating: 4.9,
    reviewsCount: 204,
    dietary: ['Gluten-Free'],
    isPopular: true,
    availableCount: 8
  }
];

// Mock Initial Chefs
const INITIAL_CHEFS = [
  {
    id: 'chef-1',
    name: 'Chef Evelyn Vane',
    email: 'evelyn@chefhub.com',
    phone: '+1 (555) 234-5678',
    cuisine: 'Fine Dining / Italian',
    experience: '8+ Years',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300',
    kitchenName: 'Vane Botanical Kitchen',
    address: '42 Neon Highway, Cyber City',
    rating: 4.9,
    reviewsCount: 212,
    kitchenOpen: true,
    capacity: 25,
    earnings: 2840.50
  },
  {
    id: 'chef-2',
    name: 'Chef Marcus Kenji',
    email: 'marcus@chefhub.com',
    phone: '+1 (555) 876-5432',
    cuisine: 'Japanese / Fusion',
    experience: '12 Years',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300',
    kitchenName: 'Kenji Izakaya Labs',
    address: '88 Cyberpunk Blvd, Sector 7',
    rating: 4.8,
    reviewsCount: 516,
    kitchenOpen: true,
    capacity: 40,
    earnings: 6490.20
  },
  {
    id: 'chef-3',
    name: 'Chef Amelie Laurent',
    email: 'amelie@chefhub.com',
    phone: '+1 (555) 456-7890',
    cuisine: 'Pastry / Plant-Based',
    experience: '6 Years',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=300',
    kitchenName: 'Amelie Sweet Alchemy',
    address: '104 Neon Dream Gardens, Skyview',
    rating: 4.8,
    reviewsCount: 251,
    kitchenOpen: false,
    capacity: 35,
    earnings: 1950.00
  }
];

// Mock Initial Orders
const INITIAL_ORDERS = [
  {
    id: 'order-101',
    customerId: 'cust-1',
    customerName: 'Aria Sterling',
    customerPhone: '+1 (555) 111-2222',
    customerAddress: 'Apartment 4B, 505 Glass Towers, Skyview',
    chefId: 'chef-1',
    chefName: 'Chef Evelyn Vane',
    items: [
      { id: 'dish-1', name: 'Neon Truffle Tagliatelle', price: 24.99, quantity: 2 }
    ],
    price: 49.98,
    deliveryFee: 4.99,
    totalPrice: 54.97,
    status: 'In Prep', // 'Pending', 'In Prep', 'Ready', 'Completed', 'Cancelled'
    pickupTime: '07:30 PM',
    prepCountdown: 15, // mins remaining
    createdAt: '2026-05-17T16:00:00.000Z'
  },
  {
    id: 'order-102',
    customerId: 'cust-1',
    customerName: 'Aria Sterling',
    customerPhone: '+1 (555) 111-2222',
    customerAddress: 'Apartment 4B, 505 Glass Towers, Skyview',
    chefId: 'chef-2',
    chefName: 'Chef Marcus Kenji',
    items: [
      { id: 'dish-2', name: 'Cyber Ramen Royale', price: 18.50, quantity: 1 },
      { id: 'dish-6', name: 'Smoked Bourbon BBQ Ribs', price: 26.99, quantity: 1 }
    ],
    price: 45.49,
    deliveryFee: 4.99,
    totalPrice: 50.48,
    status: 'Ready',
    pickupTime: '06:15 PM',
    prepCountdown: 0,
    createdAt: '2026-05-17T15:10:00.000Z'
  },
  {
    id: 'order-103',
    customerId: 'cust-2',
    customerName: 'Leo Vance',
    customerPhone: '+1 (555) 333-4444',
    customerAddress: '12 Gridlock Avenue, Cyber City',
    chefId: 'chef-1',
    chefName: 'Chef Evelyn Vane',
    items: [
      { id: 'dish-3', name: 'Vibrant Avocado Zen Bowl', price: 16.00, quantity: 1 }
    ],
    price: 16.00,
    deliveryFee: 3.99,
    totalPrice: 19.99,
    status: 'Completed',
    pickupTime: 'Yesterday',
    prepCountdown: 0,
    createdAt: '2026-05-16T18:30:00.000Z'
  }
];

export const AppProvider = ({ children }) => {
  // App States
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem('dishes');
    return saved ? JSON.parse(saved) : INITIAL_DISHES;
  });

  const [chefs, setChefs] = useState(() => {
    const saved = localStorage.getItem('chefs');
    return saved ? JSON.parse(saved) : INITIAL_CHEFS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('chefs', JSON.stringify(chefs));
  }, [chefs]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Auth Operations
  const loginUser = (email, password, role) => {
    // Check in hardcoded chefs
    if (role === 'chef') {
      const chef = chefs.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (chef) {
        const loggedChef = { ...chef, role: 'chef' };
        setCurrentUser(loggedChef);
        toast.success(`Welcome back, ${chef.name}!`, {
          style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(108, 43, 217, 0.4)' }
        });
        return true;
      }
    } else {
      // Create mock customer session or check if existing customer
      if (email && password) {
        const name = email.split('@')[0];
        const loggedCust = {
          id: 'cust-1',
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email: email,
          phone: '+1 (555) 111-2222',
          address: 'Apartment 4B, 505 Glass Towers, Skyview',
          dietary: ['Vegetarian'],
          role: 'customer'
        };
        setCurrentUser(loggedCust);
        toast.success(`Welcome back, ${loggedCust.name}!`, {
          style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(108, 43, 217, 0.4)' }
        });
        return true;
      }
    }
    toast.error('Invalid credentials or selected role.', {
      style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(236, 72, 153, 0.4)' }
    });
    return false;
  };

  const registerCustomer = (data) => {
    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      address: data.address,
      dietary: data.dietary || [],
      role: 'customer'
    };
    setCurrentUser(newCustomer);
    toast.success('Registration successful! Welcome to HomeBites.', {
      style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(34, 197, 94, 0.4)' }
    });
    return true;
  };

  const registerChef = (data) => {
    const newChef = {
      id: `chef-${Date.now()}`,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      cuisine: data.cuisine,
      experience: data.experience,
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300',
      kitchenName: `${data.fullName}'s Cyber Kitchen`,
      address: data.kitchenAddress,
      rating: 5.0,
      reviewsCount: 0,
      kitchenOpen: true,
      capacity: 20,
      earnings: 0,
      role: 'chef'
    };
    
    // Add chef to chefs list
    setChefs(prev => [...prev, newChef]);
    setCurrentUser(newChef);
    toast.success('Chef Registration successful! Welcome to ChefHub.', {
      style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(34, 197, 94, 0.4)' }
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    toast.success('Logged out successfully.', {
      style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(108, 43, 217, 0.4)' }
    });
  };

  // Cart Operations
  const addToCart = (dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        toast.success(`Updated ${dish.name} quantity in cart.`, { icon: '🛒' });
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      toast.success(`${dish.name} added to cart!`, { icon: '🛒' });
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCart(prev => prev.filter(item => item.id !== dishId));
    toast.error('Item removed from cart.');
  };

  const updateCartQty = (dishId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart(prev => prev.map(item => item.id === dishId ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Operations
  const placeOrder = (deliveryAddress) => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return false;
    }

    // Group items by chefId
    const firstItem = cart[0];
    const chefId = firstItem.chefId;
    const chefName = firstItem.chefName;

    const price = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = 3.99;
    const totalPrice = Number((price + deliveryFee).toFixed(2));

    const newOrder = {
      id: `order-${Math.floor(100 + Math.random() * 900)}`,
      customerId: currentUser?.id || 'cust-1',
      customerName: currentUser?.name || 'Valued Customer',
      customerPhone: currentUser?.phone || '+1 (555) 111-2222',
      customerAddress: deliveryAddress || currentUser?.address || 'Default Cyber Street',
      chefId,
      chefName,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      price,
      deliveryFee,
      totalPrice,
      status: 'Pending',
      pickupTime: 'Approx 30 mins',
      prepCountdown: 30,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Increment chef total earnings & capacity checks in realistic flows
    setChefs(prevChefs => prevChefs.map(chef => {
      if (chef.id === chefId) {
        return {
          ...chef,
          earnings: Number((chef.earnings + price).toFixed(2))
        };
      }
      return chef;
    }));

    clearCart();
    toast.success('Order placed successfully! Live tracking is active.', {
      style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(34, 197, 94, 0.4)' }
    });
    return true;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let prepCountdown = order.prepCountdown;
        if (newStatus === 'Ready') prepCountdown = 0;
        if (newStatus === 'Completed') prepCountdown = 0;
        
        toast.success(`Order ${orderId} is now ${newStatus}!`, {
          style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(108, 43, 217, 0.4)' }
        });
        return { ...order, status: newStatus, prepCountdown };
      }
      return order;
    }));
  };

  // Chef Operations
  const toggleKitchenStatus = () => {
    if (currentUser?.role === 'chef') {
      const updatedUser = { ...currentUser, kitchenOpen: !currentUser.kitchenOpen };
      setCurrentUser(updatedUser);
      setChefs(prev => prev.map(c => c.id === currentUser.id ? { ...c, kitchenOpen: !c.kitchenOpen } : c));
      toast.success(
        updatedUser.kitchenOpen ? 'Kitchen is now OPEN!' : 'Kitchen is now CLOSED.',
        { style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(34, 197, 94, 0.4)' } }
      );
    }
  };

  const addDish = (dishData) => {
    const newDish = {
      id: `dish-${Date.now()}`,
      name: dishData.name,
      description: dishData.description,
      price: Number(dishData.price),
      chefId: currentUser.id,
      chefName: currentUser.name,
      image: dishData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      category: dishData.category || 'General',
      prepTime: `${dishData.prepTime || 20} mins`,
      rating: 5.0,
      reviewsCount: 0,
      dietary: dishData.dietary || [],
      isPopular: false,
      availableCount: Number(dishData.availableCount || 10)
    };

    setDishes(prev => [newDish, ...prev]);
    toast.success(`${dishData.name} listed successfully!`, {
      style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(34, 197, 94, 0.4)' }
    });
  };

  const removeDish = (dishId) => {
    setDishes(prev => prev.filter(d => d.id !== dishId));
    toast.success('Dish removed from your menu.');
  };

  const updateProfile = (profileData) => {
    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    if (currentUser.role === 'chef') {
      setChefs(prev => prev.map(c => c.id === currentUser.id ? { ...c, ...profileData } : c));
    }
    toast.success('Profile updated successfully!', {
      style: { background: '#0d0a25', color: '#f3f4f6', border: '1px solid rgba(34, 197, 94, 0.4)' }
    });
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      dishes,
      chefs,
      orders,
      cart,
      loginUser,
      registerCustomer,
      registerChef,
      logout,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      placeOrder,
      updateOrderStatus,
      toggleKitchenStatus,
      addDish,
      removeDish,
      updateProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
