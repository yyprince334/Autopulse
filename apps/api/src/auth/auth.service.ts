import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { users } from '../schema/users';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';
import { refreshTokens } from 'src/schema/refreshTokens';

dotenv.config({
  path: `${process.cwd()}/../../.env`,
});

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

@Injectable()
export class AuthService {
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
      })
      .returning();

    return { id: user.id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then(([user]) => user);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: ACCESS_TOKEN_EXPIRY },
    );

    const refreshToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    await db.insert(refreshTokens).values({
      userId: user.id,
      token: refreshToken,
      expiresAt,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const [stored] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, refreshToken));

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, stored.userId));

    if (!user) {
      throw new UnauthorizedException();
    }

    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: ACCESS_TOKEN_EXPIRY },
    );

    return { accessToken: newAccessToken };
  }
}
