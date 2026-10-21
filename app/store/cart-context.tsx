'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Cart, ProductVariant } from '../lib/types';

// Contexto del carrito
const CartContext = createContext<{
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId?: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  itemCount: number;
}>({
  cart: { items: [], total: 0, subtotal: 0, itemCount: 0 },
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  subtotal: 0,
  itemCount: 0,
});

export const CartProvider = CartContext.Provider;

export function useCart() {
  return useContext(CartContext);
}