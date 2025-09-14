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
        data: TUser[]
    }
    ;
};

export type TWareHouse = {
    _id: string;
    name: string;
    location: string;
    capacity: number;
};

export type TWareHouseBuilderQueries = {
    data: TWareHouse[];
};

export type TStock = {
    _id: string;
    productName: string;
    sku: string;
    quantity: number;
    warehouse: string;
    isDeleted?: boolean;
};

export type TStockBuilderQueries = {
    data: TStock[];
};
