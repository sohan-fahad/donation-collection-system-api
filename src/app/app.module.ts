import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@src/database/database.module';
import { APIGatewayModule } from './api-gateway/api-gateway.module';
import { AuthMiddleware } from './middlewares';
import { HelpersModule } from './helpers/helper.module';
import { SeederModule } from './database/seeder/seeder.module';

@Module({
  imports: [
    DatabaseModule,
    APIGatewayModule,
    HelpersModule,
    SeederModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/web/auth*',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes(
        { path: '/web/donations*', method: RequestMethod.ALL },


      );

  }
}
