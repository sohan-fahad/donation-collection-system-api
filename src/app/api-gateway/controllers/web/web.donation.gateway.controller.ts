import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "@src/app/guards";
import { CreateDonationDto, DonationReportDto, FilterDonationDTO, UpdateDonationDto } from "@src/app/modules/donation/dtos/donation.dto";
import { DonationService } from "@src/app/modules/donation/services/donation.service";
import { SuccessResponse } from "@src/app/types";
import { AuthUser } from "@src/decorators";
import { IAuthUser } from "@src/interfaces";

@ApiTags('Web Donation')
// @UseGuards(AuthGuard)
@Controller('web/donations')
export class WebDonationGatewayController {
    RELATIONS = [];
    constructor(
        private readonly service: DonationService
    ) { }


    @UseGuards(RoleGuard)
    @Get()
    async getAll(
        @Query() query: FilterDonationDTO,
    ) {
        return await this.service.getDonations(query);
    }

    @UseGuards(RoleGuard)
    @Get('reports')
    async getReports(
        @Query() query: DonationReportDto,
    ) {
        const data = await this.service.generateReport(query);
        return new SuccessResponse("Donation report successfully", data);
    }

    @UseGuards(RoleGuard)
    @Get(":id")
    async getOne(
        @Param('id') id: string,
    ) {
        return this.service.findByIdBase(id, {
            relations: ['donor']
        });
    }

    @Post()
    async create(
        @Body() body: CreateDonationDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        const createUser = await this.service.create(body, authUser.id);
        return new SuccessResponse("Donation successfully", createUser);
    }

    @UseGuards(RoleGuard)
    @Patch(":id")
    async update(
        @Param('id') id: string,
        @Body() body: UpdateDonationDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        const createUser = await this.service.updateDonation(id, body, authUser.id);
        return new SuccessResponse("Donation successfully", createUser);
    }

    @UseGuards(RoleGuard)
    @Delete(":id")
    async delete(
        @Param('id') id: string,
        @AuthUser() authUser: IAuthUser,
    ) {
        const createUser = await this.service.softDelete(id, authUser.id);
        return new SuccessResponse("Donation successfully", createUser);
    }
}
