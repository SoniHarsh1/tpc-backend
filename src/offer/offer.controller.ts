import {
  Controller,
  Get,
  Query,
  Post,
  Patch,
  Delete,
  Param,
  ParseUUIDPipe,
  ParseArrayPipe,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
} from "@nestjs/common";
import { QueryInterceptor } from "src/interceptor/QueryInterceptor";
import { ApiFilterQuery, createArrayPipe, pipeTransform, pipeTransformArray } from "src/utils/utils";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OfferService } from "./offer.service";
import { TransactionInterceptor } from "../interceptor/TransactionInterceptor";
import { TransactionParam } from "../decorators/TransactionParam";
import { Transaction } from "sequelize";

@Controller("offers")
@ApiTags("Admin")
export class OfferController {
  constructor(private readonly offerService: OfferService) {}
  @Get()
  async getOffers() {
    const ans = "Hello World";

    return ans;
  }

  @Delete()
  @ApiQuery({ name: "id", type: String, isArray: true })
  async deleteOffers(@Query("id") ids: string | string[]) {
    const allids = typeof ids === "string" ? [ids] : ids;

    return await this.offerService.deleteOffers(allids);
  }
}
