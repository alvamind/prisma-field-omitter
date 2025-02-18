export namespace SampleTypes {
    export type User = {
        id: string;
        email: string;
        // password: string;
        // createdAt: Date;
        // updatedAt: Date;
        profile: {
            firstName: string;
            lastName: string;
            dateOfBirth: Date;
            // lastLoginAt: Date;
        };
    };

    export type Post = {
        id: string;
        title: string;
        content: string;
        // authorId: string;
        // createdAt: Date;
        // updatedAt: Date;
    };
}