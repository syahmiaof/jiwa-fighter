'use client';

import React from 'react';
import { useCart } from '@/lib/cart/CartContext';
import { DemoModal } from './DemoModal';

export const DemoModalWrapper: React.FC = () => {
  const { showDemoNotice, setShowDemoNotice } = useCart();

  return (
    <DemoModal
      isOpen={showDemoNotice}
      onClose={() => setShowDemoNotice(false)}
      title="SIMULATED CHECKOUT PROTOTYPE"
      message="This is a high-fidelity frontend prototype in demonstration mode. Real payment gateways, merchant bank APIs, and order fulfillment systems are deliberately deactivated in Version 1. No charge or real transaction has occurred."
    />
  );
};
