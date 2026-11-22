import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MoviesModule } from './movies/movies.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { GenresModule } from './genres/genres.module.js';
import { WatchlistModule } from './watchlist/watchlist.module.js';
import { getDataSourceOptions } from './database/data-source.js';
import { ReviewsModule } from './reviews/reviews.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    GenresModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...getDataSourceOptions(),
        migrationsRun: true,
      }),
    }),
    UsersModule,
    AuthModule,
    WatchlistModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
