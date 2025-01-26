import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { BcryptHelper } from "@src/app/helpers";
import { User } from "@src/app/modules/user/entities/user.entity";
import { UserService } from "@src/app/modules/user/services/user.service";
import { UserRole } from "@src/shared";

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        private readonly userService: UserService,
        private readonly bcrypt: BcryptHelper,
    ) { }


    async onModuleInit() {
        await this.seed();
    }

    async seed() {
        Logger.log('Seeding init....');

        try {
            const existAdmin = await this.userService.findOne(
                {
                    where: {
                        role: UserRole.ADMIN
                    }
                }
            )
            console.log("🚀 ~ SeederService ~ seed ~ existAdmin:", existAdmin)
            if (existAdmin) return;
            const payload: User = {
                email: 'admin@gmail.com',
                role: UserRole.ADMIN,
                phoneNumber: '01621432377',
                name: 'Super Admin',
                password: await this.bcrypt.hash('123456'),
            }
            const user = await this.userService.createOneBase(payload);
            console.log("🚀 ~ SeederService ~ seed ~ user:", user)
            Logger.log('Seeding successfull....');
        } catch (error) {
            Logger.error('DB Seed failed:', error?.message || 'Something went wrong');
        }

    }
}