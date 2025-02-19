import * as runtime from "./runtime/library.js";
import $Types = runtime.Types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result
export type PrismaPromise<T> = $Public.PrismaPromise<T>;
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
export type Content = $Result.DefaultSelection<Prisma.$ContentPayload>;
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>;
export type Video = $Result.DefaultSelection<Prisma.$VideoPayload>;
export type ContentTypeDelegate = $Enums.ContentTypeDelegate;
export class PrismaClient<ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>;
  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
  get content(): Prisma.ContentDelegate<ExtArgs, ClientOptions>;
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;
  get video(): Prisma.VideoDelegate<ExtArgs, ClientOptions>;
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;
  $connect(): $Utils.JsPromise<void>;
  $disconnect(): $Utils.JsPromise<void>;
  $use(cb: Prisma.Middleware): void;
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>;
}
export const ContentTypeDelegate: typeof $Enums.ContentTypeDelegate;
export namespace $Enums {
  export const ContentTypeDelegate: {
    Post: 'Post',
    Video: 'Video'
  };
  export type ContentTypeDelegate = (typeof ContentTypeDelegate)[keyof typeof ContentTypeDelegate];
}
export namespace Prisma {
  export import DMMF = runtime.DMMF
  export import validator = runtime.Public.validator
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql
  export import Decimal = runtime.Decimal
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;
  namespace NullTypes {
    class DbNull {
      private DbNull: never;
      private constructor();
    }
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }
  export const prismaVersion: PrismaVersion;
  export const DbNull: NullTypes.DbNull;
  export const JsonNull: NullTypes.JsonNull;
  export const AnyNull: NullTypes.AnyNull;
  export const type: unique symbol;
  export const ModelName: {
    User: 'User',
    Content: 'Content',
    Post: 'Post',
    Video: 'Video'
  };
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>;
  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };
  export const UserScalarFieldEnum: {
    id: 'id'
  };
  export const ContentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    published: 'published',
    ownerId: 'ownerId',
    contentType: 'contentType'
  };
  export const PostScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    published: 'published',
    ownerId: 'ownerId',
    contentType: 'contentType',
    title: 'title'
  };
  export const VideoScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    published: 'published',
    ownerId: 'ownerId',
    contentType: 'contentType',
    name: 'name',
    duration: 'duration'
  };
  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };
  export const dmmf: runtime.BaseDMMF;
  interface TypeMapCb extends $Utils.Fn<{ extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>;
  }
  export interface PrismaClientOptions {
    datasources?: Datasources;
    datasourceUrl?: string;
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    };
    omit?: Prisma.GlobalOmitConfig;
  }
  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } };
    readonly fields: UserFieldRefs;
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>;
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>;
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>;
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>;
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>;
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>;
    count<T extends UserCountArgs>(args?: Subset<T, UserCountArgs>): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], UserCountAggregateOutputType>
      : number
    >;
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Or<
      Extends<'skip', Keys<T>>,
      Extends<'take', Keys<T>>
    >, OrderByArg extends True extends HasSelectOrTake
    ? { orderBy: UserGroupByArgs['orderBy'] }
    : { orderBy?: UserGroupByArgs['orderBy'] }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True
    ? `Error: "by" must not be empty.`
    : HavingValid extends False
    ? {
      [P in HavingFields]: P extends ByFields
      ? never
      : P extends string
      ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
      : [
        Error,
        'Field ',
        P,
        ` in "having" needs to be provided in "by"`,
      ]
    }[HavingFields]
    : 'take' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]>(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    contents<T extends User$contentsArgs<ExtArgs> = {}>(args?: Subset<T, User$contentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>;
  }
  export interface ContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Content'], meta: { name: 'Content' } };
    readonly fields: ContentFieldRefs;
    findUnique<T extends ContentFindUniqueArgs>(args: SelectSubset<T, ContentFindUniqueArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findUniqueOrThrow<T extends ContentFindUniqueOrThrowArgs>(args: SelectSubset<T, ContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findFirst<T extends ContentFindFirstArgs>(args?: SelectSubset<T, ContentFindFirstArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findFirstOrThrow<T extends ContentFindFirstOrThrowArgs>(args?: SelectSubset<T, ContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findMany<T extends ContentFindManyArgs>(args?: SelectSubset<T, ContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany", ClientOptions>>;
    delete<T extends ContentDeleteArgs>(args: SelectSubset<T, ContentDeleteArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>;
    update<T extends ContentUpdateArgs>(args: SelectSubset<T, ContentUpdateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>;
    deleteMany<T extends ContentDeleteManyArgs>(args?: SelectSubset<T, ContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateMany<T extends ContentUpdateManyArgs>(args: SelectSubset<T, ContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateManyAndReturn<T extends ContentUpdateManyAndReturnArgs>(args: SelectSubset<T, ContentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>;
    count<T extends ContentCountArgs>(args?: Subset<T, ContentCountArgs>): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ContentCountAggregateOutputType>
      : number
    >;
    aggregate<T extends ContentAggregateArgs>(args: Subset<T, ContentAggregateArgs>): Prisma.PrismaPromise<GetContentAggregateType<T>>;
    groupBy<T extends ContentGroupByArgs, HasSelectOrTake extends Or<
      Extends<'skip', Keys<T>>,
      Extends<'take', Keys<T>>
    >, OrderByArg extends True extends HasSelectOrTake
    ? { orderBy: ContentGroupByArgs['orderBy'] }
    : { orderBy?: ContentGroupByArgs['orderBy'] }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True
    ? `Error: "by" must not be empty.`
    : HavingValid extends False
    ? {
      [P in HavingFields]: P extends ByFields
      ? never
      : P extends string
      ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
      : [
        Error,
        'Field ',
        P,
        ` in "having" needs to be provided in "by"`,
      ]
    }[HavingFields]
    : 'take' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]>(args: SubsetIntersection<T, ContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }
  export interface Prisma__ContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }
  interface ContentFieldRefs {
    readonly id: FieldRef<"Content", 'Int'>;
    readonly createdAt: FieldRef<"Content", 'DateTime'>;
    readonly updatedAt: FieldRef<"Content", 'DateTime'>;
    readonly published: FieldRef<"Content", 'Boolean'>;
    readonly ownerId: FieldRef<"Content", 'Int'>;
    readonly contentType: FieldRef<"Content", 'ContentTypeDelegate'>;
  }
  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } };
    readonly fields: PostFieldRefs;
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", ClientOptions>>;
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>;
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>;
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>;
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>;
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>;
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>;
    count<T extends PostCountArgs>(args?: Subset<T, PostCountArgs>): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], PostCountAggregateOutputType>
      : number
    >;
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>;
    groupBy<T extends PostGroupByArgs, HasSelectOrTake extends Or<
      Extends<'skip', Keys<T>>,
      Extends<'take', Keys<T>>
    >, OrderByArg extends True extends HasSelectOrTake
    ? { orderBy: PostGroupByArgs['orderBy'] }
    : { orderBy?: PostGroupByArgs['orderBy'] }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True
    ? `Error: "by" must not be empty.`
    : HavingValid extends False
    ? {
      [P in HavingFields]: P extends ByFields
      ? never
      : P extends string
      ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
      : [
        Error,
        'Field ',
        P,
        ` in "having" needs to be provided in "by"`,
      ]
    }[HavingFields]
    : 'take' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]>(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>;
    readonly createdAt: FieldRef<"Post", 'DateTime'>;
    readonly updatedAt: FieldRef<"Post", 'DateTime'>;
    readonly published: FieldRef<"Post", 'Boolean'>;
    readonly ownerId: FieldRef<"Post", 'Int'>;
    readonly contentType: FieldRef<"Post", 'ContentTypeDelegate'>;
    readonly title: FieldRef<"Post", 'String'>;
  }
  export interface VideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Video'], meta: { name: 'Video' } };
    readonly fields: VideoFieldRefs;
    findUnique<T extends VideoFindUniqueArgs>(args: SelectSubset<T, VideoFindUniqueArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findUniqueOrThrow<T extends VideoFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findFirst<T extends VideoFindFirstArgs>(args?: SelectSubset<T, VideoFindFirstArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>;
    findFirstOrThrow<T extends VideoFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>;
    findMany<T extends VideoFindManyArgs>(args?: SelectSubset<T, VideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findMany", ClientOptions>>;
    create<T extends VideoCreateArgs>(args: SelectSubset<T, VideoCreateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>;
    createMany<T extends VideoCreateManyArgs>(args?: SelectSubset<T, VideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    createManyAndReturn<T extends VideoCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>;
    delete<T extends VideoDeleteArgs>(args: SelectSubset<T, VideoDeleteArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>;
    update<T extends VideoUpdateArgs>(args: SelectSubset<T, VideoUpdateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>;
    deleteMany<T extends VideoDeleteManyArgs>(args?: SelectSubset<T, VideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateMany<T extends VideoUpdateManyArgs>(args: SelectSubset<T, VideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
    updateManyAndReturn<T extends VideoUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>;
    upsert<T extends VideoUpsertArgs>(args: SelectSubset<T, VideoUpsertArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>;
    count<T extends VideoCountArgs>(args?: Subset<T, VideoCountArgs>): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], VideoCountAggregateOutputType>
      : number
    >;
    aggregate<T extends VideoAggregateArgs>(args: Subset<T, VideoAggregateArgs>): Prisma.PrismaPromise<GetVideoAggregateType<T>>;
    groupBy<T extends VideoGroupByArgs, HasSelectOrTake extends Or<
      Extends<'skip', Keys<T>>,
      Extends<'take', Keys<T>>
    >, OrderByArg extends True extends HasSelectOrTake
    ? { orderBy: VideoGroupByArgs['orderBy'] }
    : { orderBy?: VideoGroupByArgs['orderBy'] }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True
    ? `Error: "by" must not be empty.`
    : HavingValid extends False
    ? {
      [P in HavingFields]: P extends ByFields
      ? never
      : P extends string
      ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
      : [
        Error,
        'Field ',
        P,
        ` in "having" needs to be provided in "by"`,
      ]
    }[HavingFields]
    : 'take' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Keys<T>
    ? 'orderBy' extends Keys<T>
    ? ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]>(args: SubsetIntersection<T, VideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }
  export interface Prisma__VideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }
  interface VideoFieldRefs {
    readonly id: FieldRef<"Video", 'Int'>;
    readonly createdAt: FieldRef<"Video", 'DateTime'>;
    readonly updatedAt: FieldRef<"Video", 'DateTime'>;
    readonly published: FieldRef<"Video", 'Boolean'>;
    readonly ownerId: FieldRef<"Video", 'Int'>;
    readonly contentType: FieldRef<"Video", 'ContentTypeDelegate'>;
    readonly name: FieldRef<"Video", 'String'>;
    readonly duration: FieldRef<"Video", 'Int'>;
  }
  export type PrismaPromise<T> = $Public.PrismaPromise<T>;
  export type DecimalJsLike = runtime.DecimalJsLike;
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;
  export type PrismaVersion = {
    client: string
  };
  type SelectAndInclude = {
    select: any
    include: any
  };
  type SelectAndOmit = {
    select: any
    omit: any
  };
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>;
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  export type Enumerable<T> = T | Array<T>;
  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T];
  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  };
  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K;
  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = T extends object ?
    U extends object ?
    (Without<T, U> & U) | (Without<U, T> & T)
    : U : T;
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Uint8Array
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False;
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      [P in K]: Prisma__Pick<O, P & keyof O>
    }[K];
  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict];
  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
  export type Union = any;
  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {};
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;
  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};
  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
  }>>;
  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];
  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};
  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};
  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };
  type NoExpand<T> = T extends unknown ? T : never;
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
    | { [P in keyof O as P extends K ? K : never]-?: O[P] } & O
    : never>;
  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
  export type Boolean = True | False;
  export type True = 1;
  export type False = 0;
  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B];
  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0
    : A1 extends A2
    ? 1
    : 0;
  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;
  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2];
  export type Keys<U extends Union> = U extends unknown ? keyof U : never;
  type Cast<A, B> = A extends B ? A : B;
  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
    ? O[P]
    : never
  } : never;
  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
    ?
    T[K] extends infer TK
    ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
    : never
    : {} extends FieldPaths<T[K]>
    ? never
    : K
  }[keyof T];
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
  export type ModelName = (typeof ModelName)[keyof typeof ModelName];
  export type Datasources = {
    db?: Datasource
  };
  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "content" | "post" | "video"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Content: {
        payload: Prisma.$ContentPayload<ExtArgs>
        fields: Prisma.ContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findFirst: {
            args: Prisma.ContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findMany: {
            args: Prisma.ContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          create: {
            args: Prisma.ContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          createMany: {
            args: Prisma.ContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          delete: {
            args: Prisma.ContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          update: {
            args: Prisma.ContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          deleteMany: {
            args: Prisma.ContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          upsert: {
            args: Prisma.ContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          aggregate: {
            args: Prisma.ContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContent>
          }
          groupBy: {
            args: Prisma.ContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContentCountArgs<ExtArgs>
            result: $Utils.Optional<ContentCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Video: {
        payload: Prisma.$VideoPayload<ExtArgs>
        fields: Prisma.VideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findFirst: {
            args: Prisma.VideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findMany: {
            args: Prisma.VideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          create: {
            args: Prisma.VideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          createMany: {
            args: Prisma.VideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          delete: {
            args: Prisma.VideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          update: {
            args: Prisma.VideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          deleteMany: {
            args: Prisma.VideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          upsert: {
            args: Prisma.VideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          aggregate: {
            args: Prisma.VideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideo>
          }
          groupBy: {
            args: Prisma.VideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoCountArgs<ExtArgs>
            result: $Utils.Optional<VideoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  };
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export type GlobalOmitConfig = {
    user?: UserOmit
    content?: ContentOmit
    post?: PostOmit
    video?: VideoOmit
  };
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  };
  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never;
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;
  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  };
  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  };
  export type PrismaAction = | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  };
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;
  export type Datasource = {
    url?: string
  };
  export type UserCountOutputType = {
    contents: number
  };
  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contents?: boolean | UserCountOutputTypeCountContentsArgs
  };
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  };
  export type UserCountOutputTypeCountContentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
  };
  export type UserCountOutputTypeCountDelegate_aux_User_contents_PostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  };
  export type UserCountOutputTypeCountDelegate_aux_User_contents_VideoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
  };
  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  };
  export type UserAvgAggregateOutputType = {
    id: number | null
  };
  export type UserSumAggregateOutputType = {
    id: number | null
  };
  export type UserMinAggregateOutputType = {
    id: number | null
  };
  export type UserMaxAggregateOutputType = {
    id: number | null
  };
  export type UserCountAggregateOutputType = {
    id: number
    _all: number
  };
  export type UserAvgAggregateInputType = {
    id?: true
  };
  export type UserSumAggregateInputType = {
    id?: true
  };
  export type UserMinAggregateInputType = {
    id?: true
  };
  export type UserMaxAggregateInputType = {
    id?: true
  };
  export type UserCountAggregateInputType = {
    id?: true
    _all?: true
  };
  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | UserCountAggregateInputType
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  };
  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateUser[P]>
    : GetScalarType<T[P], AggregateUser[P]>
  };
  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  };
  export type UserGroupByOutputType = {
    id: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  };
  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], UserGroupByOutputType[P]>
        : GetScalarType<T[P], UserGroupByOutputType[P]>
      }
    >
  >;
  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contents?: boolean | User$contentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>;
  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>;
  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>;
  export type UserSelectScalar = {
    id?: boolean
  };
  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id", ExtArgs["result"]["user"]>;
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contents?: boolean | User$contentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  };
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      contents: Prisma.$ContentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  };
  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>;
  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true
  };
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
  };
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
  };
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  };
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  };
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  };
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  };
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: UserCreateManyInput | UserCreateManyInput[]
  };
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    data: UserCreateManyInput | UserCreateManyInput[]
  };
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    where: UserWhereUniqueInput
  };
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
    limit?: number
  };
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
    limit?: number
  };
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  };
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
  };
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    limit?: number
  };
  export type User$contentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  };
  export type User$delegate_aux_User_contents_PostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  };
  export type User$delegate_aux_User_contents_VideoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    cursor?: VideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  };
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
  };
  export type AggregateContent = {
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  };
  export type ContentAvgAggregateOutputType = {
    id: number | null
    ownerId: number | null
  };
  export type ContentSumAggregateOutputType = {
    id: number | null
    ownerId: number | null
  };
  export type ContentMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    published: boolean | null
    ownerId: number | null
    contentType: $Enums.ContentTypeDelegate | null
  };
  export type ContentMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    published: boolean | null
    ownerId: number | null
    contentType: $Enums.ContentTypeDelegate | null
  };
  export type ContentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    published: number
    ownerId: number
    contentType: number
    _all: number
  };
  export type ContentAvgAggregateInputType = {
    id?: true
    ownerId?: true
  };
  export type ContentSumAggregateInputType = {
    id?: true
    ownerId?: true
  };
  export type ContentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
  };
  export type ContentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
  };
  export type ContentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
    _all?: true
  };
  export type ContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | ContentCountAggregateInputType
    _avg?: ContentAvgAggregateInputType
    _sum?: ContentSumAggregateInputType
    _min?: ContentMinAggregateInputType
    _max?: ContentMaxAggregateInputType
  };
  export type GetContentAggregateType<T extends ContentAggregateArgs> = {
    [P in keyof T & keyof AggregateContent]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateContent[P]>
    : GetScalarType<T[P], AggregateContent[P]>
  };
  export type ContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithAggregationInput | ContentOrderByWithAggregationInput[]
    by: ContentScalarFieldEnum[] | ContentScalarFieldEnum
    having?: ContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentCountAggregateInputType | true
    _avg?: ContentAvgAggregateInputType
    _sum?: ContentSumAggregateInputType
    _min?: ContentMinAggregateInputType
    _max?: ContentMaxAggregateInputType
  };
  export type ContentGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    published: boolean
    ownerId: number
    contentType: $Enums.ContentTypeDelegate
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  };
  type GetContentGroupByPayload<T extends ContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContentGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ContentGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ContentGroupByOutputType[P]>
        : GetScalarType<T[P], ContentGroupByOutputType[P]>
      }
    >
  >;
  export type ContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>;
  export type ContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>;
  export type ContentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>;
  export type ContentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
  };
  export type ContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "published" | "ownerId" | "contentType", ExtArgs["result"]["content"]>;
  export type ContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type ContentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type ContentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type $ContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ($PostPayload<ExtArgs> & { scalars: { contentType: 'Post' } }) | ($VideoPayload<ExtArgs> & { scalars: { contentType: 'Video' } });
  type ContentGetPayload<S extends boolean | null | undefined | ContentDefaultArgs> = $Result.GetResult<Prisma.$ContentPayload, S>;
  type ContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<ContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ContentCountAggregateInputType | true
  };
  export type ContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where: ContentWhereUniqueInput
  };
  export type ContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where: ContentWhereUniqueInput
  };
  export type ContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  };
  export type ContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  };
  export type ContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  };
  export type ContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    data: XOR<ContentCreateInput, ContentUncheckedCreateInput>
  };
  export type ContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: ContentCreateManyInput | ContentCreateManyInput[]
  };
  export type ContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelectCreateManyAndReturn<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    data: ContentCreateManyInput | ContentCreateManyInput[]
    include?: ContentIncludeCreateManyAndReturn<ExtArgs> | null
  };
  export type ContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    data: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
    where: ContentWhereUniqueInput
  };
  export type ContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    where?: ContentWhereInput
    limit?: number
  };
  export type ContentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    where?: ContentWhereInput
    limit?: number
    include?: ContentIncludeUpdateManyAndReturn<ExtArgs> | null
  };
  export type ContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateInput, ContentUncheckedCreateInput>
    update: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
  };
  export type ContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
    where: ContentWhereUniqueInput
  };
  export type ContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
    limit?: number
  };
  export type ContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: ContentSelect<ExtArgs> | null
    omit?: ContentOmit<ExtArgs> | null
    include?: ContentInclude<ExtArgs> | null
  };
  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  };
  export type PostAvgAggregateOutputType = {
    id: number | null
    ownerId: number | null
  };
  export type PostSumAggregateOutputType = {
    id: number | null
    ownerId: number | null
  };
  export type PostMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    published: boolean | null
    ownerId: number | null
    contentType: $Enums.ContentTypeDelegate | null
    title: string | null
  };
  export type PostMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    published: boolean | null
    ownerId: number | null
    contentType: $Enums.ContentTypeDelegate | null
    title: string | null
  };
  export type PostCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    published: number
    ownerId: number
    contentType: number
    title: number
    _all: number
  };
  export type PostAvgAggregateInputType = {
    id?: true
    ownerId?: true
  };
  export type PostSumAggregateInputType = {
    id?: true
    ownerId?: true
  };
  export type PostMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
    title?: true
  };
  export type PostMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
    title?: true
  };
  export type PostCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
    title?: true
    _all?: true
  };
  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | PostCountAggregateInputType
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  };
  export type GetPostAggregateType<T extends PostAggregateArgs> = {
    [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregatePost[P]>
    : GetScalarType<T[P], AggregatePost[P]>
  };
  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  };
  export type PostGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    published: boolean
    ownerId: number
    contentType: $Enums.ContentTypeDelegate
    title: string
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  };
  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], PostGroupByOutputType[P]>
        : GetScalarType<T[P], PostGroupByOutputType[P]>
      }
    >
  >;
  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    title?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>;
  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    title?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>;
  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    title?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>;
  export type PostSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    title?: boolean
  };
  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "published" | "ownerId" | "contentType" | "title", ExtArgs["result"]["post"]>;
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      published: boolean
      ownerId: number
      contentType: $Enums.ContentTypeDelegate
      title: string
    }, ExtArgs["result"]["post"]>
    composites: {}
  };
  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>;
  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostCountAggregateInputType | true
  };
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
  };
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
  };
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  };
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  };
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  };
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  };
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: PostCreateManyInput | PostCreateManyInput[]
  };
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    data: PostCreateManyInput | PostCreateManyInput[]
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  };
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    where: PostWhereUniqueInput
  };
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    where?: PostWhereInput
    limit?: number
  };
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    where?: PostWhereInput
    limit?: number
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  };
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  };
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
  };
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    limit?: number
  };
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
  };
  export type AggregateVideo = {
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  };
  export type VideoAvgAggregateOutputType = {
    id: number | null
    ownerId: number | null
    duration: number | null
  };
  export type VideoSumAggregateOutputType = {
    id: number | null
    ownerId: number | null
    duration: number | null
  };
  export type VideoMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    published: boolean | null
    ownerId: number | null
    contentType: $Enums.ContentTypeDelegate | null
    name: string | null
    duration: number | null
  };
  export type VideoMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    published: boolean | null
    ownerId: number | null
    contentType: $Enums.ContentTypeDelegate | null
    name: string | null
    duration: number | null
  };
  export type VideoCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    published: number
    ownerId: number
    contentType: number
    name: number
    duration: number
    _all: number
  };
  export type VideoAvgAggregateInputType = {
    id?: true
    ownerId?: true
    duration?: true
  };
  export type VideoSumAggregateInputType = {
    id?: true
    ownerId?: true
    duration?: true
  };
  export type VideoMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
    name?: true
    duration?: true
  };
  export type VideoMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
    name?: true
    duration?: true
  };
  export type VideoCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    published?: true
    ownerId?: true
    contentType?: true
    name?: true
    duration?: true
    _all?: true
  };
  export type VideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    cursor?: VideoWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | VideoCountAggregateInputType
    _avg?: VideoAvgAggregateInputType
    _sum?: VideoSumAggregateInputType
    _min?: VideoMinAggregateInputType
    _max?: VideoMaxAggregateInputType
  };
  export type GetVideoAggregateType<T extends VideoAggregateArgs> = {
    [P in keyof T & keyof AggregateVideo]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateVideo[P]>
    : GetScalarType<T[P], AggregateVideo[P]>
  };
  export type VideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithAggregationInput | VideoOrderByWithAggregationInput[]
    by: VideoScalarFieldEnum[] | VideoScalarFieldEnum
    having?: VideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoCountAggregateInputType | true
    _avg?: VideoAvgAggregateInputType
    _sum?: VideoSumAggregateInputType
    _min?: VideoMinAggregateInputType
    _max?: VideoMaxAggregateInputType
  };
  export type VideoGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    published: boolean
    ownerId: number
    contentType: $Enums.ContentTypeDelegate
    name: string
    duration: number
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  };
  type GetVideoGroupByPayload<T extends VideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof VideoGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], VideoGroupByOutputType[P]>
        : GetScalarType<T[P], VideoGroupByOutputType[P]>
      }
    >
  >;
  export type VideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    name?: boolean
    duration?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>;
  export type VideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    name?: boolean
    duration?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>;
  export type VideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    name?: boolean
    duration?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>;
  export type VideoSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    published?: boolean
    ownerId?: boolean
    contentType?: boolean
    name?: boolean
    duration?: boolean
  };
  export type VideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "published" | "ownerId" | "contentType" | "name" | "duration", ExtArgs["result"]["video"]>;
  export type VideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type VideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type VideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  };
  export type $VideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Video"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      published: boolean
      ownerId: number
      contentType: $Enums.ContentTypeDelegate
      name: string
      duration: number
    }, ExtArgs["result"]["video"]>
    composites: {}
  };
  type VideoGetPayload<S extends boolean | null | undefined | VideoDefaultArgs> = $Result.GetResult<Prisma.$VideoPayload, S>;
  type VideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<VideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VideoCountAggregateInputType | true
  };
  export type VideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where: VideoWhereUniqueInput
  };
  export type VideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where: VideoWhereUniqueInput
  };
  export type VideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    cursor?: VideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  };
  export type VideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    cursor?: VideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  };
  export type VideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    cursor?: VideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  };
  export type VideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    data: XOR<VideoCreateInput, VideoUncheckedCreateInput>
  };
  export type VideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: VideoCreateManyInput | VideoCreateManyInput[]
  };
  export type VideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelectCreateManyAndReturn<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    data: VideoCreateManyInput | VideoCreateManyInput[]
    include?: VideoIncludeCreateManyAndReturn<ExtArgs> | null
  };
  export type VideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    data: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
    where: VideoWhereUniqueInput
  };
  export type VideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    where?: VideoWhereInput
    limit?: number
  };
  export type VideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    where?: VideoWhereInput
    limit?: number
    include?: VideoIncludeUpdateManyAndReturn<ExtArgs> | null
  };
  export type VideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateInput, VideoUncheckedCreateInput>
    update: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
  };
  export type VideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
    where: VideoWhereUniqueInput
  };
  export type VideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
    limit?: number
  };
  export type VideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: VideoSelect<ExtArgs> | null
    omit?: VideoOmit<ExtArgs> | null
    include?: VideoInclude<ExtArgs> | null
  };
  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
  export type ContentScalarFieldEnum = (typeof ContentScalarFieldEnum)[keyof typeof ContentScalarFieldEnum];
  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum];
  export type VideoScalarFieldEnum = (typeof VideoScalarFieldEnum)[keyof typeof VideoScalarFieldEnum];
  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
  export type EnumContentTypeDelegateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContentTypeDelegate'>;
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    contents?: ContentListRelationFilter
  };
  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    contents?: ContentOrderByRelationAggregateInput
  };
  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    contents?: ContentListRelationFilter
  }, "id">;
  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  };
  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
  };
  export type ContentWhereInput = {
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    id?: IntFilter<"Content"> | number
    createdAt?: DateTimeFilter<"Content"> | Date | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    published?: BoolFilter<"Content"> | boolean
    ownerId?: IntFilter<"Content"> | number
    contentType?: EnumContentTypeDelegateFilter<"Content"> | $Enums.ContentTypeDelegate
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  };
  export type ContentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    owner?: UserOrderByWithRelationInput
  };
  export type ContentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    createdAt?: DateTimeFilter<"Content"> | Date | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    published?: BoolFilter<"Content"> | boolean
    ownerId?: IntFilter<"Content"> | number
    contentType?: EnumContentTypeDelegateFilter<"Content"> | $Enums.ContentTypeDelegate
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">;
  export type ContentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    _count?: ContentCountOrderByAggregateInput
    _avg?: ContentAvgOrderByAggregateInput
    _max?: ContentMaxOrderByAggregateInput
    _min?: ContentMinOrderByAggregateInput
    _sum?: ContentSumOrderByAggregateInput
  };
  export type ContentScalarWhereWithAggregatesInput = {
    AND?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    OR?: ContentScalarWhereWithAggregatesInput[]
    NOT?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Content"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Content"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Content"> | Date | string
    published?: BoolWithAggregatesFilter<"Content"> | boolean
    ownerId?: IntWithAggregatesFilter<"Content"> | number
    contentType?: EnumContentTypeDelegateWithAggregatesFilter<"Content"> | $Enums.ContentTypeDelegate
  };
  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    published?: BoolFilter<"Post"> | boolean
    ownerId?: IntFilter<"Post"> | number
    contentType?: EnumContentTypeDelegateFilter<"Post"> | $Enums.ContentTypeDelegate
    title?: StringFilter<"Post"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  };
  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
    owner?: UserOrderByWithRelationInput
  };
  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    published?: BoolFilter<"Post"> | boolean
    ownerId?: IntFilter<"Post"> | number
    contentType?: EnumContentTypeDelegateFilter<"Post"> | $Enums.ContentTypeDelegate
    title?: StringFilter<"Post"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">;
  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  };
  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    published?: BoolWithAggregatesFilter<"Post"> | boolean
    ownerId?: IntWithAggregatesFilter<"Post"> | number
    contentType?: EnumContentTypeDelegateWithAggregatesFilter<"Post"> | $Enums.ContentTypeDelegate
    title?: StringWithAggregatesFilter<"Post"> | string
  };
  export type VideoWhereInput = {
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    id?: IntFilter<"Video"> | number
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
    published?: BoolFilter<"Video"> | boolean
    ownerId?: IntFilter<"Video"> | number
    contentType?: EnumContentTypeDelegateFilter<"Video"> | $Enums.ContentTypeDelegate
    name?: StringFilter<"Video"> | string
    duration?: IntFilter<"Video"> | number
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  };
  export type VideoOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    owner?: UserOrderByWithRelationInput
  };
  export type VideoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
    published?: BoolFilter<"Video"> | boolean
    ownerId?: IntFilter<"Video"> | number
    contentType?: EnumContentTypeDelegateFilter<"Video"> | $Enums.ContentTypeDelegate
    name?: StringFilter<"Video"> | string
    duration?: IntFilter<"Video"> | number
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">;
  export type VideoOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    _count?: VideoCountOrderByAggregateInput
    _avg?: VideoAvgOrderByAggregateInput
    _max?: VideoMaxOrderByAggregateInput
    _min?: VideoMinOrderByAggregateInput
    _sum?: VideoSumOrderByAggregateInput
  };
  export type VideoScalarWhereWithAggregatesInput = {
    AND?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    OR?: VideoScalarWhereWithAggregatesInput[]
    NOT?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Video"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Video"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Video"> | Date | string
    published?: BoolWithAggregatesFilter<"Video"> | boolean
    ownerId?: IntWithAggregatesFilter<"Video"> | number
    contentType?: EnumContentTypeDelegateWithAggregatesFilter<"Video"> | $Enums.ContentTypeDelegate
    name?: StringWithAggregatesFilter<"Video"> | string
    duration?: IntWithAggregatesFilter<"Video"> | number
  };
  export type UserCreateInput = {
    contents?: ContentCreateNestedManyWithoutOwnerInput
  };
  export type UserUncheckedCreateInput = {
    id?: number
    contents?: ContentUncheckedCreateNestedManyWithoutOwnerInput
  };
  export type UserUpdateInput = {
    contents?: ContentUpdateManyWithoutOwnerNestedInput
  };
  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    contents?: ContentUncheckedUpdateManyWithoutOwnerNestedInput
  };
  export type UserCreateManyInput = {
    id?: number
  };
  export type UserUpdateManyMutationInput = {
  };
  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
  };
  export type ContentCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    owner: UserCreateNestedOneWithoutContentsInput
  };
  export type ContentUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    ownerId: number
  };
  export type ContentUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    owner?: UserUpdateOneRequiredWithoutContentsNestedInput
  };
  export type ContentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: IntFieldUpdateOperationsInput | number
  };
  export type ContentCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    ownerId: number
  };
  export type ContentUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
  };
  export type ContentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: IntFieldUpdateOperationsInput | number
  };
  export type PostCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    title: string
    owner: UserCreateNestedOneWithoutDelegate_aux_User_contents_PostInput
  };
  export type PostUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    ownerId: number
    title: string
  };
  export type PostUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    owner?: UserUpdateOneRequiredWithoutDelegate_aux_User_contents_PostNestedInput
  };
  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  };
  export type PostCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    ownerId: number
    title: string
  };
  export type PostUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  };
  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
  };
  export type VideoCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    name: string
    duration: number
    owner: UserCreateNestedOneWithoutDelegate_aux_User_contents_VideoInput
  };
  export type VideoUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    ownerId: number
    name: string
    duration: number
  };
  export type VideoUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutDelegate_aux_User_contents_VideoNestedInput
  };
  export type VideoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  };
  export type VideoCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    ownerId: number
    name: string
    duration: number
  };
  export type VideoUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  };
  export type VideoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  };
  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  };
  export type ContentListRelationFilter = {
    every?: ContentWhereInput
    some?: ContentWhereInput
    none?: ContentWhereInput
  };
  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  };
  export type VideoListRelationFilter = {
    every?: VideoWhereInput
    some?: VideoWhereInput
    none?: VideoWhereInput
  };
  export type ContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  };
  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  };
  export type VideoOrderByRelationAggregateInput = {
    _count?: SortOrder
  };
  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
  };
  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  };
  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
  };
  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
  };
  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  };
  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  };
  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  };
  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  };
  export type EnumContentTypeDelegateFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentTypeDelegate | EnumContentTypeDelegateFieldRefInput<$PrismaModel>
    in?: $Enums.ContentTypeDelegate[]
    notIn?: $Enums.ContentTypeDelegate[]
    not?: NestedEnumContentTypeDelegateFilter<$PrismaModel> | $Enums.ContentTypeDelegate
  };
  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  };
  export type ContentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
  };
  export type ContentAvgOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  };
  export type ContentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
  };
  export type ContentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
  };
  export type ContentSumOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  };
  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  };
  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  };
  export type EnumContentTypeDelegateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentTypeDelegate | EnumContentTypeDelegateFieldRefInput<$PrismaModel>
    in?: $Enums.ContentTypeDelegate[]
    notIn?: $Enums.ContentTypeDelegate[]
    not?: NestedEnumContentTypeDelegateWithAggregatesFilter<$PrismaModel> | $Enums.ContentTypeDelegate
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContentTypeDelegateFilter<$PrismaModel>
    _max?: NestedEnumContentTypeDelegateFilter<$PrismaModel>
  };
  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  };
  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
  };
  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  };
  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
  };
  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
  };
  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
  };
  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  };
  export type VideoCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
  };
  export type VideoAvgOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    duration?: SortOrder
  };
  export type VideoMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
  };
  export type VideoMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    published?: SortOrder
    ownerId?: SortOrder
    contentType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
  };
  export type VideoSumOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    duration?: SortOrder
  };
  export type ContentCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ContentCreateWithoutOwnerInput, ContentUncheckedCreateWithoutOwnerInput> | ContentCreateWithoutOwnerInput[] | ContentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutOwnerInput | ContentCreateOrConnectWithoutOwnerInput[]
    createMany?: ContentCreateManyOwnerInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  };
  export type PostCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PostCreateWithoutOwnerInput, PostUncheckedCreateWithoutOwnerInput> | PostCreateWithoutOwnerInput[] | PostUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PostCreateOrConnectWithoutOwnerInput | PostCreateOrConnectWithoutOwnerInput[]
    createMany?: PostCreateManyOwnerInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  };
  export type VideoCreateNestedManyWithoutOwnerInput = {
    create?: XOR<VideoCreateWithoutOwnerInput, VideoUncheckedCreateWithoutOwnerInput> | VideoCreateWithoutOwnerInput[] | VideoUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutOwnerInput | VideoCreateOrConnectWithoutOwnerInput[]
    createMany?: VideoCreateManyOwnerInputEnvelope
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
  };
  export type ContentUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ContentCreateWithoutOwnerInput, ContentUncheckedCreateWithoutOwnerInput> | ContentCreateWithoutOwnerInput[] | ContentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutOwnerInput | ContentCreateOrConnectWithoutOwnerInput[]
    createMany?: ContentCreateManyOwnerInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  };
  export type PostUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PostCreateWithoutOwnerInput, PostUncheckedCreateWithoutOwnerInput> | PostCreateWithoutOwnerInput[] | PostUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PostCreateOrConnectWithoutOwnerInput | PostCreateOrConnectWithoutOwnerInput[]
    createMany?: PostCreateManyOwnerInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  };
  export type VideoUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<VideoCreateWithoutOwnerInput, VideoUncheckedCreateWithoutOwnerInput> | VideoCreateWithoutOwnerInput[] | VideoUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutOwnerInput | VideoCreateOrConnectWithoutOwnerInput[]
    createMany?: VideoCreateManyOwnerInputEnvelope
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
  };
  export type ContentUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ContentCreateWithoutOwnerInput, ContentUncheckedCreateWithoutOwnerInput> | ContentCreateWithoutOwnerInput[] | ContentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutOwnerInput | ContentCreateOrConnectWithoutOwnerInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutOwnerInput | ContentUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ContentCreateManyOwnerInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutOwnerInput | ContentUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutOwnerInput | ContentUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  };
  export type PostUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PostCreateWithoutOwnerInput, PostUncheckedCreateWithoutOwnerInput> | PostCreateWithoutOwnerInput[] | PostUncheckedCreateWithoutOwnerInput[]
    //h/ connectOrCreate: PostCreateOrConnectWithoutOwnerInput | PostCreateOrConnectWithoutOwnerInput[];
    upsert?: PostUpsertWithWhereUniqueWithoutOwnerInput | PostUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PostCreateManyOwnerInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutOwnerInput | PostUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PostUpdateManyWithWhereWithoutOwnerInput | PostUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  };
  export type VideoUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<VideoCreateWithoutOwnerInput, VideoUncheckedCreateWithoutOwnerInput> | VideoCreateWithoutOwnerInput[] | VideoUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutOwnerInput | VideoCreateOrConnectWithoutOwnerInput[]
    upsert?: VideoUpsertWithWhereUniqueWithoutOwnerInput | VideoUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: VideoCreateManyOwnerInputEnvelope
    set?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    disconnect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    delete?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    update?: VideoUpdateWithWhereUniqueWithoutOwnerInput | VideoUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: VideoUpdateManyWithWhereWithoutOwnerInput | VideoUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: VideoScalarWhereInput | VideoScalarWhereInput[]
  };
  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  };
  export type ContentUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ContentCreateWithoutOwnerInput, ContentUncheckedCreateWithoutOwnerInput> | ContentCreateWithoutOwnerInput[] | ContentUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutOwnerInput | ContentCreateOrConnectWithoutOwnerInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutOwnerInput | ContentUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ContentCreateManyOwnerInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutOwnerInput | ContentUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutOwnerInput | ContentUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  };
  export type PostUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PostCreateWithoutOwnerInput, PostUncheckedCreateWithoutOwnerInput> | PostCreateWithoutOwnerInput[] | PostUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PostCreateOrConnectWithoutOwnerInput | PostCreateOrConnectWithoutOwnerInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutOwnerInput | PostUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PostCreateManyOwnerInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutOwnerInput | PostUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PostUpdateManyWithWhereWithoutOwnerInput | PostUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  };
  export type VideoUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<VideoCreateWithoutOwnerInput, VideoUncheckedCreateWithoutOwnerInput> | VideoCreateWithoutOwnerInput[] | VideoUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: VideoCreateOrConnectWithoutOwnerInput | VideoCreateOrConnectWithoutOwnerInput[]
    upsert?: VideoUpsertWithWhereUniqueWithoutOwnerInput | VideoUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: VideoCreateManyOwnerInputEnvelope
    set?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    disconnect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    delete?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    connect?: VideoWhereUniqueInput | VideoWhereUniqueInput[]
    update?: VideoUpdateWithWhereUniqueWithoutOwnerInput | VideoUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: VideoUpdateManyWithWhereWithoutOwnerInput | VideoUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: VideoScalarWhereInput | VideoScalarWhereInput[]
  };
  export type UserCreateNestedOneWithoutContentsInput = {
    create?: XOR<UserCreateWithoutContentsInput, UserUncheckedCreateWithoutContentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContentsInput
    connect?: UserWhereUniqueInput
  };
  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  };
  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  };
  export type EnumContentTypeDelegateFieldUpdateOperationsInput = {
    set?: $Enums.ContentTypeDelegate
  };
  export type UserUpdateOneRequiredWithoutContentsNestedInput = {
    create?: XOR<UserCreateWithoutContentsInput, UserUncheckedCreateWithoutContentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContentsInput
    upsert?: UserUpsertWithoutContentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContentsInput, UserUpdateWithoutContentsInput>, UserUncheckedUpdateWithoutContentsInput>
  };
  export type UserCreateNestedOneWithoutDelegate_aux_User_contents_PostInput = {
    create?: XOR<UserCreateWithoutDelegate_aux_User_contents_PostInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_PostInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegate_aux_User_contents_PostInput
    connect?: UserWhereUniqueInput
  };
  export type StringFieldUpdateOperationsInput = {
    set?: string
  };
  export type UserUpdateOneRequiredWithoutDelegate_aux_User_contents_PostNestedInput = {
    create?: XOR<UserCreateWithoutDelegate_aux_User_contents_PostInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_PostInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegate_aux_User_contents_PostInput
    upsert?: UserUpsertWithoutDelegate_aux_User_contents_PostInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDelegate_aux_User_contents_PostInput, UserUpdateWithoutDelegate_aux_User_contents_PostInput>, UserUncheckedUpdateWithoutDelegate_aux_User_contents_PostInput>
  };
  export type UserCreateNestedOneWithoutDelegate_aux_User_contents_VideoInput = {
    create?: XOR<UserCreateWithoutDelegate_aux_User_contents_VideoInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_VideoInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegate_aux_User_contents_VideoInput
    connect?: UserWhereUniqueInput
  };
  export type UserUpdateOneRequiredWithoutDelegate_aux_User_contents_VideoNestedInput = {
    create?: XOR<UserCreateWithoutDelegate_aux_User_contents_VideoInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_VideoInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegate_aux_User_contents_VideoInput
    upsert?: UserUpsertWithoutDelegate_aux_User_contents_VideoInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDelegate_aux_User_contents_VideoInput, UserUpdateWithoutDelegate_aux_User_contents_VideoInput>, UserUncheckedUpdateWithoutDelegate_aux_User_contents_VideoInput>
  };
  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  };
  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  };
  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  };
  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  };
  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  };
  export type NestedEnumContentTypeDelegateFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentTypeDelegate | EnumContentTypeDelegateFieldRefInput<$PrismaModel>
    in?: $Enums.ContentTypeDelegate[]
    notIn?: $Enums.ContentTypeDelegate[]
    not?: NestedEnumContentTypeDelegateFilter<$PrismaModel> | $Enums.ContentTypeDelegate
  };
  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  };
  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  };
  export type NestedEnumContentTypeDelegateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentTypeDelegate | EnumContentTypeDelegateFieldRefInput<$PrismaModel>
    in?: $Enums.ContentTypeDelegate[]
    notIn?: $Enums.ContentTypeDelegate[]
    not?: NestedEnumContentTypeDelegateWithAggregatesFilter<$PrismaModel> | $Enums.ContentTypeDelegate
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContentTypeDelegateFilter<$PrismaModel>
    _max?: NestedEnumContentTypeDelegateFilter<$PrismaModel>
  };
  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  };
  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  };
  export type ContentCreateWithoutOwnerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
  };
  export type ContentUncheckedCreateWithoutOwnerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
  };
  export type ContentCreateOrConnectWithoutOwnerInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutOwnerInput, ContentUncheckedCreateWithoutOwnerInput>
  };
  export type ContentCreateManyOwnerInputEnvelope = {
    data: ContentCreateManyOwnerInput | ContentCreateManyOwnerInput[]
  };
  export type PostCreateWithoutOwnerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    title: string
  };
  export type PostUncheckedCreateWithoutOwnerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    title: string
  };
  export type PostCreateOrConnectWithoutOwnerInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutOwnerInput, PostUncheckedCreateWithoutOwnerInput>
  };
  export type PostCreateManyOwnerInputEnvelope = {
    data: PostCreateManyOwnerInput | PostCreateManyOwnerInput[]
  };
  export type VideoCreateWithoutOwnerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    name: string
    duration: number
  };
  export type VideoUncheckedCreateWithoutOwnerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    name: string
    duration: number
  };
  export type VideoCreateOrConnectWithoutOwnerInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutOwnerInput, VideoUncheckedCreateWithoutOwnerInput>
  };
  export type VideoCreateManyOwnerInputEnvelope = {
    data: VideoCreateManyOwnerInput | VideoCreateManyOwnerInput[]
  };
  export type ContentUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ContentWhereUniqueInput
    update: XOR<ContentUpdateWithoutOwnerInput, ContentUncheckedUpdateWithoutOwnerInput>
    create: XOR<ContentCreateWithoutOwnerInput, ContentUncheckedCreateWithoutOwnerInput>
  };
  export type ContentUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ContentWhereUniqueInput
    data: XOR<ContentUpdateWithoutOwnerInput, ContentUncheckedUpdateWithoutOwnerInput>
  };
  export type ContentUpdateManyWithWhereWithoutOwnerInput = {
    where: ContentScalarWhereInput
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyWithoutOwnerInput>
  };
  export type ContentScalarWhereInput = {
    AND?: ContentScalarWhereInput | ContentScalarWhereInput[]
    OR?: ContentScalarWhereInput[]
    NOT?: ContentScalarWhereInput | ContentScalarWhereInput[]
    id?: IntFilter<"Content"> | number
    createdAt?: DateTimeFilter<"Content"> | Date | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    published?: BoolFilter<"Content"> | boolean
    ownerId?: IntFilter<"Content"> | number
    contentType?: EnumContentTypeDelegateFilter<"Content"> | $Enums.ContentTypeDelegate
  };
  export type PostUpsertWithWhereUniqueWithoutOwnerInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutOwnerInput, PostUncheckedUpdateWithoutOwnerInput>
    create: XOR<PostCreateWithoutOwnerInput, PostUncheckedCreateWithoutOwnerInput>
  };
  export type PostUpdateWithWhereUniqueWithoutOwnerInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutOwnerInput, PostUncheckedUpdateWithoutOwnerInput>
  };
  export type PostUpdateManyWithWhereWithoutOwnerInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutOwnerInput>
  };
  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    published?: BoolFilter<"Post"> | boolean
    ownerId?: IntFilter<"Post"> | number
    contentType?: EnumContentTypeDelegateFilter<"Post"> | $Enums.ContentTypeDelegate
    title?: StringFilter<"Post"> | string
  };
  export type VideoUpsertWithWhereUniqueWithoutOwnerInput = {
    where: VideoWhereUniqueInput
    update: XOR<VideoUpdateWithoutOwnerInput, VideoUncheckedUpdateWithoutOwnerInput>
    create: XOR<VideoCreateWithoutOwnerInput, VideoUncheckedCreateWithoutOwnerInput>
  };
  export type VideoUpdateWithWhereUniqueWithoutOwnerInput = {
    where: VideoWhereUniqueInput
    data: XOR<VideoUpdateWithoutOwnerInput, VideoUncheckedUpdateWithoutOwnerInput>
  };
  export type VideoUpdateManyWithWhereWithoutOwnerInput = {
    where: VideoScalarWhereInput
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyWithoutOwnerInput>
  };
  export type VideoScalarWhereInput = {
    AND?: VideoScalarWhereInput | VideoScalarWhereInput[]
    OR?: VideoScalarWhereInput[]
    NOT?: VideoScalarWhereInput | VideoScalarWhereInput[]
    id?: IntFilter<"Video"> | number
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
    published?: BoolFilter<"Video"> | boolean
    ownerId?: IntFilter<"Video"> | number
    contentType?: EnumContentTypeDelegateFilter<"Video"> | $Enums.ContentTypeDelegate
    name?: StringFilter<"Video"> | string
    duration?: IntFilter<"Video"> | number
  };
  export type UserCreateWithoutContentsInput = {
  };
  export type UserUncheckedCreateWithoutContentsInput = {
    id?: number
  };
  export type UserCreateOrConnectWithoutContentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContentsInput, UserUncheckedCreateWithoutContentsInput>
  };
  export type UserUpsertWithoutContentsInput = {
    update: XOR<UserUpdateWithoutContentsInput, UserUncheckedUpdateWithoutContentsInput>
    create: XOR<UserCreateWithoutContentsInput, UserUncheckedCreateWithoutContentsInput>
    where?: UserWhereInput
  };
  export type UserUpdateToOneWithWhereWithoutContentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContentsInput, UserUncheckedUpdateWithoutContentsInput>
  };
  export type UserUpdateWithoutContentsInput = {
  };
  export type UserUncheckedUpdateWithoutContentsInput = {
    id?: IntFieldUpdateOperationsInput | number
  };
  export type UserCreateWithoutDelegate_aux_User_contents_PostInput = {
  };
  export type UserUncheckedCreateWithoutDelegate_aux_User_contents_PostInput = {
    id?: number
  };
  export type UserCreateOrConnectWithoutDelegate_aux_User_contents_PostInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDelegate_aux_User_contents_PostInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_PostInput>
  };
  export type UserUpsertWithoutDelegate_aux_User_contents_PostInput = {
    update: XOR<UserUpdateWithoutDelegate_aux_User_contents_PostInput, UserUncheckedUpdateWithoutDelegate_aux_User_contents_PostInput>
    create: XOR<UserCreateWithoutDelegate_aux_User_contents_PostInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_PostInput>
    where?: UserWhereInput
  };
  export type UserUpdateToOneWithWhereWithoutDelegate_aux_User_contents_PostInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDelegate_aux_User_contents_PostInput, UserUncheckedUpdateWithoutDelegate_aux_User_contents_PostInput>
  };
  export type UserUpdateWithoutDelegate_aux_User_contents_PostInput = {
  };
  export type UserUncheckedUpdateWithoutDelegate_aux_User_contents_PostInput = {
    id?: IntFieldUpdateOperationsInput | number
  };
  export type UserCreateWithoutDelegate_aux_User_contents_VideoInput = {
  };
  export type UserUncheckedCreateWithoutDelegate_aux_User_contents_VideoInput = {
    id?: number
  };
  export type UserCreateOrConnectWithoutDelegate_aux_User_contents_VideoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDelegate_aux_User_contents_VideoInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_VideoInput>
  };
  export type UserUpsertWithoutDelegate_aux_User_contents_VideoInput = {
    update: XOR<UserUpdateWithoutDelegate_aux_User_contents_VideoInput, UserUncheckedUpdateWithoutDelegate_aux_User_contents_VideoInput>
    create: XOR<UserCreateWithoutDelegate_aux_User_contents_VideoInput, UserUncheckedCreateWithoutDelegate_aux_User_contents_VideoInput>
    where?: UserWhereInput
  };
  export type UserUpdateToOneWithWhereWithoutDelegate_aux_User_contents_VideoInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDelegate_aux_User_contents_VideoInput, UserUncheckedUpdateWithoutDelegate_aux_User_contents_VideoInput>
  };
  export type UserUpdateWithoutDelegate_aux_User_contents_VideoInput = {
  };
  export type UserUncheckedUpdateWithoutDelegate_aux_User_contents_VideoInput = {
    id?: IntFieldUpdateOperationsInput | number
  };
  export type ContentCreateManyOwnerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
  };
  export type PostCreateManyOwnerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    title: string
  };
  export type VideoCreateManyOwnerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    published?: boolean
    name: string
    duration: number
  };
  export type ContentUpdateWithoutOwnerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
  };
  export type ContentUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
  };
  export type ContentUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
  };
  export type PostUpdateWithoutOwnerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  };
  export type PostUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  };
  export type PostUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  };
  export type VideoUpdateWithoutOwnerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  };
  export type VideoUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  };
  export type VideoUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    published?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  };
  export type BatchPayload = {
    count: number
  };
}