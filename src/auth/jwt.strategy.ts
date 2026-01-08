import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { Injectable } from '@nestjs/common';

// Define the structure of your Auth0 JWT payload
interface Auth0JwtPayload {
  sub: string; // The user ID from Auth0
  email?: string; // Optional email claim
  [key: string]: any; // Capture any additional claims Auth0 might include
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    /**
     * 1️⃣ secretProvider
     * -----------------
     * Auth0 uses RS256 asymmetric signing. Instead of storing the secret locally,
     * we fetch the **public keys** from Auth0’s JWKS endpoint.
     *
     * passportJwtSecret returns a function that Passport can call to verify tokens.
     * TypeScript cannot infer the exact type, so we cast it safely.
     */
    const secretProvider = passportJwtSecret({
      cache: true, // Cache the keys to reduce network requests
      rateLimit: true, // Prevent excessive JWKS requests
      jwksRequestsPerMinute: 60, // Max requests per minute
      jwksUri: `https://${config.get<string>('AUTH0_DOMAIN')}/.well-known/jwks.json`, // JWKS endpoint
    }) as unknown as (
      header: any,
      callback: (err: any, secret?: string | Buffer) => void,
    ) => void;

    /**
     * 2️⃣ Strategy Options
     * -------------------
     * Define how Passport JWT strategy will extract and verify the token.
     */
    const options: StrategyOptions = {
      // Extract token from Authorization header as "Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as (
        req: any,
      ) => string | null,

      // Provide the function to get the secret/public key
      secretOrKeyProvider: secretProvider,

      // Audience must match the API you defined in Auth0
      audience: config.get<string>('AUTH0_AUDIENCE'),

      // Issuer is your Auth0 domain; helps ensure the token came from Auth0
      issuer: `https://${config.get<string>('AUTH0_DOMAIN')}/`,

      // Allowed algorithm for token validation
      algorithms: ['RS256'],
    };

    // Call the PassportStrategy constructor with options
    super(options);
  }

  /**
   * 3️⃣ validate()
   * --------------
   * Called after JWT is successfully decoded and verified.
   * This is where you map Auth0 claims to your internal user object.
   *
   * By returning this object, NestJS sets `req.user` (or GraphQL context user).
   */
  validate(payload: Auth0JwtPayload) {
    // Here you can transform or normalize the payload as needed
    return {
      userId: payload.sub,
      email: payload.email,
      // Include other claims if necessary
    };
  }
}
