import { expect, test, describe } from "bun:test";
import { processorService } from "../src/modules/processor.service";

const processor = processorService.processorService;

describe("Glob Pattern Matching", () => {
    describe("matchesTarget", () => {
        test("matches 'all' target", () => {
            expect(processor.matchesTarget("UserType", "all")).toBe(true);
            expect(processor.matchesTarget("PostType", "all")).toBe(true);
        });

        test("matches exact string target", () => {
            expect(processor.matchesTarget("UserType", "UserType")).toBe(true);
            expect(processor.matchesTarget("PostType", "UserType")).toBe(false);
        });

        test("matches array of exact string targets", () => {
            expect(processor.matchesTarget("UserType", ["UserType", "PostType"])).toBe(true);
            expect(processor.matchesTarget("PostType", ["UserType", "PostType"])).toBe(true);
            expect(processor.matchesTarget("CommentType", ["UserType", "PostType"])).toBe(false);
        });

        test("matches wildcard suffix pattern", () => {
            expect(processor.matchesTarget("UserInput", "*Input")).toBe(true);
            expect(processor.matchesTarget("CreateUserInput", "*Input")).toBe(true);
            expect(processor.matchesTarget("UserType", "*Input")).toBe(false);
        });

        test("matches wildcard prefix pattern", () => {
            expect(processor.matchesTarget("AdminDashboard", "Admin*")).toBe(true);
            expect(processor.matchesTarget("SuperAdmin", "Admin*")).toBe(false);
        });

        test("matches wildcard middle pattern", () => {
            expect(processor.matchesTarget("SuperUserController", "*User*")).toBe(true);
            expect(processor.matchesTarget("Controller", "*User*")).toBe(false);
        });

        test("matches case-sensitive patterns", () => {
            expect(processor.matchesTarget("SuperUserController", "*User*")).toBe(true);
            expect(processor.matchesTarget("superUserController", "*User*")).toBe(false);
        });

        test("matches with undefined target", () => {
            expect(processor.matchesTarget("AnyType", undefined)).toBe(false);
        });

        test("matches complex nested patterns", () => {
            expect(processor.matchesTarget("GraphQLUserResolver", "*User*Resolver")).toBe(true);
            expect(processor.matchesTarget("UserResolver", "*User*Resolver")).toBe(true);
            expect(processor.matchesTarget("GraphQLResolver", "*User*Resolver")).toBe(false);
        });

        test("matches multiple wildcards in pattern", () => {
            expect(processor.matchesTarget("CreateUserPostInput", "Create*Post*")).toBe(true);
            expect(processor.matchesTarget("UpdatePostUserInput", "Create*Post*")).toBe(false);
        });

        test("matches compound type names", () => {
            expect(processor.matchesTarget("UserPostCommentType", ["*Post*", "*Comment*"])).toBe(true);
            expect(processor.matchesTarget("UserReplyType", ["*Post*", "*Comment*"])).toBe(false);
        });

        test("matches version patterns", () => {
            expect(processor.matchesTarget("UserV1Type", "*V[0-9]*")).toBe(true);
            expect(processor.matchesTarget("UserVxType", "*V[0-9]*")).toBe(false);
        });

        test("matches interface patterns", () => {
            expect(processor.matchesTarget("IUserRepository", "I*Repository")).toBe(true);
            expect(processor.matchesTarget("UserRepository", "I*Repository")).toBe(false);
        });

        test("matches conditional type patterns", () => {
            expect(processor.matchesTarget("MaybeUser", "Maybe*")).toBe(true);
            expect(processor.matchesTarget("OptionalUser", "Maybe*")).toBe(false);
        });

        test("matches namespace patterns", () => {
            expect(processor.matchesTarget("API::UserType", "API::*")).toBe(true);
            expect(processor.matchesTarget("Core::UserType", "API::*")).toBe(false);
        });

        test("matches generics pattern", () => {
            expect(processor.matchesTarget("Partial<UserType>", "Partial<*>")).toBe(true);
            expect(processor.matchesTarget("Required<UserType>", "Partial<*>")).toBe(false);
        });

        test("matches domain specific patterns", () => {
            expect(processor.matchesTarget("UserDTOType", "*DTO*")).toBe(true);
            expect(processor.matchesTarget("UserDataType", "*DTO*")).toBe(false);
        });

        test("matches complex combination patterns", () => {
            const patterns = ["*Service", "*Controller", "*Repository"];
            expect(processor.matchesTarget("UserManagementService", patterns)).toBe(true);
            expect(processor.matchesTarget("UserProfile", patterns)).toBe(false);
        });

        test("matches PrismaPromise", () => {
            expect(processor.matchesTarget("PrismaPromise<T>", "PrismaPromise<*>")).toBe(true);
            expect(processor.matchesTarget("Promise<T>", "PrismaPromise<*>")).toBe(false);
        });

        test("matches $Result.DefaultSelection", () => {
            expect(processor.matchesTarget("$Result.DefaultSelection<Prisma.$UserPayload>", "$Result.DefaultSelection<*>")).toBe(true);
            expect(processor.matchesTarget("DefaultSelection<Prisma.$UserPayload>", "$Result.DefaultSelection<*>")).toBe(false);
        });

        test("matches $Public.PrismaPromise", () => {
            expect(processor.matchesTarget("$Public.PrismaPromise<T>", "$Public.PrismaPromise<*>")).toBe(true);
        });

        test("matches $Utils.JsPromise", () => {
            expect(processor.matchesTarget("$Utils.JsPromise<R>", "$Utils.JsPromise<*>")).toBe(true);
        });

        test("matches $Extensions.InternalArgs", () => {
            expect(processor.matchesTarget("$Extensions.InternalArgs", "$Extensions.InternalArgs")).toBe(true);
        });

        test("matches ContentTypeDelegate", () => {
            expect(processor.matchesTarget("ContentTypeDelegate", "*Delegate")).toBe(true);
        });

        test("matches UserDelegate", () => {
            expect(processor.matchesTarget("UserDelegate<ExtArgs, ClientOptions>", "UserDelegate<*, *>")).toBe(true);
            expect(processor.matchesTarget("UserDelegate", "UserDelegate<*, *>")).toBe(false);
        });

        test("matches ContentScalarFieldEnum", () => {
            expect(processor.matchesTarget("ContentScalarFieldEnum", "*ScalarFieldEnum")).toBe(true);
        });

        test("matches UserCountOutputType", () => {
            expect(processor.matchesTarget("UserCountOutputType", "*CountOutputType")).toBe(true);
        });

        test("matches ContentCreateInput", () => {
            expect(processor.matchesTarget("ContentCreateInput", "*CreateInput")).toBe(true);
        });
    });

    describe("matchesField", () => {
        test("matches exact field name", () => {
            expect(processor.matchesField("id", "id")).toBe(true);
            expect(processor.matchesField("name", "id")).toBe(false);
        });

        test("matches array of exact field names", () => {
            expect(processor.matchesField("id", ["id", "name"])).toBe(true);
            expect(processor.matchesField("email", ["id", "name"])).toBe(false);
        });

        test("matches wildcard suffix pattern", () => {
            expect(processor.matchesField("createdAt", "*At")).toBe(true);
            expect(processor.matchesField("updatedAt", "*At")).toBe(true);
            expect(processor.matchesField("created", "*At")).toBe(false);
        });

        test("matches wildcard prefix pattern", () => {
            expect(processor.matchesField("passwordHash", "password*")).toBe(true);
            expect(processor.matchesField("userPassword", "password*")).toBe(false);
        });

        test("matches wildcard middle pattern", () => {
            expect(processor.matchesField("userPasswordHash", "*Password*")).toBe(true);
            expect(processor.matchesField("userHash", "*Password*")).toBe(false);
        });

        test("matches case-insensitive", () => {
            expect(processor.matchesField("CreatedAt", "*At")).toBe(true);
            expect(processor.matchesField("CREATEDAT", "*At")).toBe(true);
            expect(processor.matchesField("createdat", "*At")).toBe(true);
        });

        test("matches with special characters", () => {
            expect(processor.matchesField("user_name", "user_*")).toBe(true);
            expect(processor.matchesField("user-name", "user-*")).toBe(true);
            expect(processor.matchesField("user.name", "user.*")).toBe(true);
        });

        test("handles empty values", () => {
            expect(processor.matchesField("", "*")).toBe(false);
            expect(processor.matchesField("field", "")).toBe(false);
        });

        test("matches complex nested field patterns", () => {
            expect(processor.matchesField("userMetadata_lastLogin", "*Metadata_*")).toBe(true);
            expect(processor.matchesField("userData_lastLogin", "*Metadata_*")).toBe(false);
        });

        test("matches versioned field patterns", () => {
            expect(processor.matchesField("addressV2_street", "address*_*")).toBe(true);
            expect(processor.matchesField("locationStreet", "address*_*")).toBe(false);
        });

        test("matches snake case variations", () => {
            expect(processor.matchesField("user_profile_image_url", "user_profile_*_url")).toBe(true);
            expect(processor.matchesField("user_avatar_url", "user_profile_*_url")).toBe(false);
        });

        test("matches numeric sequences", () => {
            expect(processor.matchesField("attempt1_timestamp", "attempt[0-9]*_*")).toBe(true);
            expect(processor.matchesField("attemptA_timestamp", "attempt[0-9]*_*")).toBe(false);
        });

        test("matches prefixed boolean fields", () => {
            expect(processor.matchesField("isVerifiedEmail", "is*Email")).toBe(true);
            expect(processor.matchesField("hasVerifiedEmail", "is*Email")).toBe(false);
        });

        test("matches composite field names", () => {
            expect(processor.matchesField("primaryUserEmail", ["primary*", "*Email"])).toBe(true);
            expect(processor.matchesField("secondaryUserPhone", ["primary*", "*Email"])).toBe(false);
        });

        test("matches temporary field patterns", () => {
            expect(processor.matchesField("temp_session_token", "temp_*_*")).toBe(true);
            expect(processor.matchesField("permanent_token", "temp_*_*")).toBe(false);
        });

        test("matches environment specific fields", () => {
            expect(processor.matchesField("dev_api_key", "dev_*_*")).toBe(true);
            expect(processor.matchesField("prod_api_key", "dev_*_*")).toBe(false);
        });

        test("matches complex status fields", () => {
            expect(processor.matchesField("status_pending_verification", "status_*_*")).toBe(true);
            expect(processor.matchesField("isPendingVerification", "status_*_*")).toBe(false);
        });

        test("matches locale specific fields", () => {
            expect(processor.matchesField("title_en_US", "*_[a-z][a-z]_[A-Z][A-Z]")).toBe(true);
            expect(processor.matchesField("title_english", "*_[a-z][a-z]_[A-Z][A-Z]")).toBe(false);
        });

        test("matches id field", () => {
            expect(processor.matchesField("id", "id")).toBe(true);
        });

        test("matches createdAt field", () => {
            expect(processor.matchesField("createdAt", "*At")).toBe(true);
        });

        test("matches updatedAt field", () => {
            expect(processor.matchesField("updatedAt", "*At")).toBe(true);
        });

        test("matches published field", () => {
            expect(processor.matchesField("published", "published")).toBe(true);
        });

        test("matches ownerId field", () => {
            expect(processor.matchesField("ownerId", "*Id")).toBe(true);
        });

        test("matches contentType field", () => {
            expect(processor.matchesField("contentType", "contentType")).toBe(true);
        });

        test("matches title field", () => {
            expect(processor.matchesField("title", "title")).toBe(true);
        });

        test("matches name field", () => {
            expect(processor.matchesField("name", "name")).toBe(true);
        });

        test("matches duration field", () => {
            expect(processor.matchesField("duration", "duration")).toBe(true);
        });

        test("matches contents field", () => {
            expect(processor.matchesField("contents", "contents")).toBe(true);
        });
    });
});
