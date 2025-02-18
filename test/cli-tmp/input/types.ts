
export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    isActive: boolean;
};

export type CreatePostInput = {
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
};
