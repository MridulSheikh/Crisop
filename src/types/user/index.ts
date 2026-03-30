export type TUser = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "admin" | "manager" | "user" | "super";
};
export type TUserBuilderQueries = {
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: TUser[];
  };
};

export type TWareHouse = {
  _id: string;
  name: string;
  location: string;
  capacity: number;
};

export type TWareHouseBuilderQueries = {
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: TWareHouse[];
  };
};

export type TStock = {
  _id: string;
  productName: string;
  sku: string;
  quantity: number;
  warehouse: TWareHouse;
  isDeleted?: boolean;
  unit: string;
};

export type TCategory = {
  _id: string;
  name: string;
  description: string;
  productsCount: number;
};

export type TStockBuilderQueries = {
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: TStock[];
  };
};

export type TCategoryQueryBuilder = {
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: TCategory[];
  };
};

export type TProduct = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: TStock;
  category: TCategory;
  tags?: string[];
  images: string[];
  isFeatured?: boolean;
  isDeleted: boolean;
  isPublished: boolean;
};

export type TProductBuilderQueries = {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: TProduct[];
};
