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
                Enabled = true,
                AccessTokenType = AccessTokenType.Jwt,
                UpdateAccessTokenClaimsOnRefresh = true,
                //required for angular localhost, else it will be blocked
                AllowAccessTokensViaBrowser = true,
                AllowedCorsOrigins = {"http://localhost:4200"},
                RequireClientSecret = false,
                ClientName = "Angular Eshop",
                ClientId = "eshopAngular",
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                AllowRememberConsent = false,
                RequireConsent = false,
                
                RedirectUris = new List<string>
                {
                    "https://localhost:4200/signin-callback",
                    "https://localhost:4200/assets/silent-callback.html",
                    "https://localhost:5002/signin-oidc"
                },
                PostLogoutRedirectUris = new List<string>
                {
                    "https://localhost:4200/signout-callback",
                    "https://localhost:5002/signout-callback-oidc"
                },
                ClientSecrets = new List<Secret>
                {
                    new Secret("secret".Sha256())
                },
                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile
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
            }
        };
}