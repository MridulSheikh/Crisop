"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} from "@/redux/features/order/orderApi";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import {
  ChevronLeft,
  MapPin,
  Mail,
  Phone,
  Package,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const STATUS_STEPS = ["pending", "packing", "shipped", "delivered"];

const statusIcon = {
  pending: Clock,
  packing: Package,
  shipped: Truck,
  delivered: CheckCircle2,
};

const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const orderId = typeof id === "string" ? id : "";

  const { data, isLoading, isError } = useGetSingleOrderQuery(orderId, {
    skip: !orderId,
  });

  const [updateStatus] = useUpdateOrderStatusMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const order = data?.data;

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <TailSpin color="#22c55e" />
      </div>
    );
  }

  // ================= ERROR =================
  if (isError || !order) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3 text-gray-500">
        <XCircle className="w-10 h-10 text-red-400" />
        <p>Order not found</p>
      </div>
    );
  }

  // ================= HANDLERS =================
  const handleStatusChange = async (status: string) => {
    if (!order?._id) return;

    const toastId = toast.loading("Updating status...");

    try {
      await updateStatus({
        id: order._id,
        status: status as any,
      }).unwrap();

      toast.update(toastId, {
        render: "Order status updated ✅",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });
    } catch (err: any) {
      console.log(err)
      toast.update(toastId, {
        render: err?.data?.message || "Failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleCancel = async () => {
    if (!order?._id) return;

    const toastId = toast.loading("Cancelling order...");

    try {
      await cancelOrder({ id: order._id }).unwrap();

      toast.update(toastId, {
        render: "Order cancelled 🚫",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || "Cancel failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  // ================= FORMAT =================
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatCurrency = (num: number) =>
    `$${num?.toLocaleString()}`;

  // ================= UI =================
  return (
    <div className="min-h-screen p-4 md:p-8">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 border rounded-lg bg-white"
          >
            <ChevronLeft />
          </button>

          <div>
            <h1 className="text-xl font-bold">
              Order #{order.orderId || order._id.slice(0, 8)}
            </h1>
            <p className="text-sm text-gray-500">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
            {order.isPaymentComplete ? "Paid" : "Unpaid"}
          </span>

          {order.isCancel && (
            <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full">
              Cancelled
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">

          {/* STATUS STEPPER */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between">
              {STATUS_STEPS.map((step, index) => {
                const Icon =
                  statusIcon[step as keyof typeof statusIcon];
                const active = index <= currentStepIndex;

                return (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => handleStatusChange(step)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        active
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-400"
                      }`}
                    >
                      <Icon size={16} />
                    </button>

                    <span className="text-xs mt-2 capitalize">
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUICK TOGGLE */}
          <div className="bg-white p-4 rounded-xl shadow flex gap-2 flex-wrap">
            {STATUS_STEPS.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-3 py-1 text-sm rounded-md border ${
                  order.status === status
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}

            {!order.isCancel && (
              <button
                onClick={handleCancel}
                className="ml-auto px-3 py-1 text-sm rounded-md bg-red-500 text-white"
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* PRODUCTS */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b flex items-center gap-2">
              <Package size={16} />
              <h2 className="font-semibold">Products</h2>
            </div>

            {order.items?.map((item: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border-b"
              >
                <Image
                  src={
                    item?.product?.images?.[0]?.url ||
                    "/placeholder.png"
                  }
                  alt="product"
                  width={60}
                  height={60}
                  className="rounded-md"
                />

                <div className="flex-1">
                  <p className="font-medium">
                    {item?.product?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  {formatCurrency(item.price)}
                </p>
              </div>
            ))}

            <div className="p-4 bg-gray-50 text-right font-bold">
              Total: {formatCurrency(order.total)}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">

          {/* CUSTOMER */}
          <div className="bg-white p-4 rounded-xl shadow space-y-3">
            <h3 className="font-semibold">Customer Info</h3>

            <div className="flex gap-2 items-center text-sm">
              <Mail size={14} />
              {order.shippingInfo?.email}
            </div>

            <div className="flex gap-2 items-center text-sm">
              <Phone size={14} />
              {order.shippingInfo?.contact}
            </div>

            <div className="flex gap-2 items-start text-sm">
              <MapPin size={14} />
              <span>
                {order.shippingInfo?.addressOneLine},{" "}
                {order.shippingInfo?.division}
              </span>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-4 rounded-xl shadow space-y-2">
            <h3 className="font-semibold">Payment</h3>

            <p className="text-sm">
              Method: {order.isCod ? "Cash on Delivery" : "Online"}
            </p>

            <p className="text-sm">
              Status:{" "}
              {order.isPaymentComplete ? "Paid" : "Pending"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;