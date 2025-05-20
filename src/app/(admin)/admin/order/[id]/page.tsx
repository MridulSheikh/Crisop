'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const mockOrder = {
  id: 'ORD123456',
  date: '2025-05-20',
  status: 'Processing',
  customer: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+880-123456789',
  },
  shipping: {
    address: '123 Main Street, Dhaka, Bangladesh',
    method: 'Standard Delivery',
  },
  items: [
    {
      id: 'p1',
      name: 'Fresh Apples',
      quantity: 2,
      price: 5.5,
    },
    {
      id: 'p2',
      name: 'Organic Milk',
      quantity: 1,
      price: 3.25,
    },
  ],
  total: 14.25,
};

export default function OrderDetailsPage() {
  const order = mockOrder;

  return (
    <div className="">
      <Card className=' rounded-none'>
        <CardHeader>
          <CardTitle>Order #{order.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Order Info */}
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p>{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge>{order.status}</Badge>
              </div>
            </div>

            <Separator />

            {/* Customer Info */}
            <div>
              <p className="font-medium mb-1">Customer Info</p>
              <p>{order.customer.name}</p>
              <p className="text-sm text-muted-foreground">{order.customer.email}</p>
              <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
            </div>

            {/* Shipping Info */}
            <div>
              <p className="font-medium mb-1">Shipping Info</p>
              <p>{order.shipping.address}</p>
              <p className="text-sm text-muted-foreground">{order.shipping.method}</p>
            </div>

            <Separator />

            {/* Items */}
            <div>
              <p className="font-medium mb-2">Items</p>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <Separator />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>${order.total.toFixed(2)}</p>
            </div>

            {/* Action */}
            <div className="flex justify-end mt-4">
              <Button variant="outline">Mark as Shipped</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
