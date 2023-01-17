using System.Reflection.Metadata;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace IdentityServer;

public class Config
{
    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            //This client will consume Catalog API
            new Client
            {
                ClientId = "CatalogApiClient",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets =
                {
                    new Secret("secret".Sha256())
                },
                AllowedScopes = {"catalogapi"}
            },
            new Client
            {
                ClientId = "eshopClient",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets =
                {
                    new Secret("secret".Sha256())
                },
                AllowedScopes = {"eshopgateway"}
            },
            new Client
            {
                ClientName = "Angular Eshop",
                ClientId = "eshopAngular",
                AllowedGrantTypes = GrantTypes.Code,
                AllowAccessTokensViaBrowser = true,
                Enabled = true,
                AccessTokenType = AccessTokenType.Jwt,
                UpdateAccessTokenClaimsOnRefresh = true,
                //required for angular localhost, else it will be blocked
                
                AllowedCorsOrigins = {"http://localhost:4200"},
                RequireClientSecret = false,
                
                RequirePkce = true,
                AllowRememberConsent = false,
                RequireConsent = false,
                AccessTokenLifetime = 3600,
                RedirectUris = new List<string>
                {
                    "http://localhost:4200/signin-callback",
                    "http://localhost:4200/assets/silent-callback.html",
                    "https://localhost:9009/signin-oidc"
                },
                PostLogoutRedirectUris = new List<string>
                {
                    "http://localhost:4200/signout-callback",
                   "https://localhost:9009/signout-callback-oidc"
                },
                ClientSecrets = new List<Secret>
                {
                    new Secret("secret".Sha256())
                },
                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.Email
                }
            }
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            //List all APIs, which you want to protect
            new ApiScope("catalogapi", "Catalog API"),
            new ApiScope("eshopgateway", "Eshop Gateway")
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new ApiResource[]
        {
        };

    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Address(),
            new IdentityResources.Email(),
        };

    public static List<TestUser> TestUsers =>
        new List<TestUser>
        {
            new TestUser
            {
                SubjectId = "07506d6b-4a09-43df-a762-ddd7d03df75a",
                Username = "rahul",
                Password = "rahul",
                Claims = new List<Claim>
                {
                    new Claim(JwtClaimTypes.GivenName, "rahul"),
                    new Claim(JwtClaimTypes.FamilyName, "sahay")
                }
            },
            new TestUser
            {
                SubjectId = "a9ea0f25-b964-409f-bcce-c923266249b4",
                Username = "Mick",
                Password = "MickPassword",
                Claims = new List<Claim>
                {
                    new Claim("given_name", "Mick"),
                    new Claim("family_name", "Mining"),
                    new Claim("address", "Sunny Street 4"),
                    new Claim("role", "Admin"),
                    new Claim("position", "Administrator"), 
                    new Claim("country", "USA")
                }
            },
            new TestUser
            {
                SubjectId = "c95ddb8c-79ec-488a-a485-fe57a1462340",
                Username = "Jane",
                Password = "JanePassword",
                Claims = new List<Claim>
                {
                    new Claim("given_name", "Jane"),
                    new Claim("family_name", "Downing"),
                    new Claim("address", "Long Avenue 289"),
                    new Claim("role", "Visitor"),
                    new Claim("position", "Viewer"),
                    new Claim("country", "USA")
                }
            }
        };
}