import { Skeleton } from "./Skeleton";

export const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button skeleton */}
      <div className="mb-6">
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Skeleton className="h-96 w-full" />
        </div>

        {/* Product details skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Product name */}
          <Skeleton className="h-8 w-4/5 mb-4" />

          {/* Price */}
          <Skeleton className="h-10 w-32 mb-6" />

          {/* Product details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          {/* Quantity and button skeleton */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  </div>
);
