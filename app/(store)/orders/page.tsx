"use client";

import { useEffect, useState } from "react";

interface Order {
    _id: string;
    orderNumber: string;
    orderDate: string;
    status: string;
    totalPrice: number;
    currency: string;
}

function formatCurrency(amount: number, currency: string): string {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
        }).format(amount);
    } catch (error) {
        console.error("Error formatting currency:", currency, error);
        return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
    }
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch('/api/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-semibold mb-8 text-gray-900">
                    My Orders
                </h1>
                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-600">
                        <p>You have no orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.orderNumber} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                Order Number
                                            </p>
                                            <p className="font-mono text-sm text-green-600 break-all">
                                                {order.orderNumber}
                                            </p>
                                        </div>
                                        <div className="lg:text-right">
                                            <p className="text-sm text-gray-600 mb-1">
                                                Order Date
                                            </p>
                                            <p className="font-medium">
                                                {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="flex items-center">
                                            <span className="text-sm mr-2">Status:</span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                order.status === "paid"
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="lg:text-right">
                                            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                            <p className="font-bold text-xl text-gray-900">
                                                {formatCurrency(order.totalPrice ?? 0, order.currency)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}