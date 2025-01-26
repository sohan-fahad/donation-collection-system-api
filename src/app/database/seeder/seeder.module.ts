
import { Module } from '@nestjs/common';
import { UserModule } from '@src/app/modules/user/user.module';
import { SeederService } from './seeder.service';
import { HelpersModule } from '@src/app/helpers/helper.module';

@Module({
    imports: [UserModule, HelpersModule],
    controllers: [],
    providers: [SeederService],
})
export class SeederModule { }
