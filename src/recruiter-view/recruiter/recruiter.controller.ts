import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Body,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecruiterService } from "./recruiter.service";
import { User } from "src/decorators/User";
import { IUser } from "src/auth/User";
import { pipeTransform, pipeTransformArray } from "src/utils/utils";
import { TransactionInterceptor } from "src/interceptor/TransactionInterceptor";
import { TransactionParam } from "src/decorators/TransactionParam";
import { Transaction } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { FileService } from "src/services/FileService";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { RecruiterViewDto } from "./dtos/get.dto";
import { UpdateRecruiterDto } from "./dtos/patch.dto";

@Controller("recruiter-view")
@ApiBearerAuth("jwt")
@UseGuards(AuthGuard("jwt"))
@ApiTags("Recruiter-View/Recruiter")
export class RecruiterController {
  constructor(
    private recruiterService: RecruiterService,
    private fileService: FileService
  ) {}

  @Get()
  @ApiResponse({ type: RecruiterViewDto })
  async getRecruiter(@User() user: IUser) {
    const ans = await this.recruiterService.getRecruiter(user.recruiterId);

    return pipeTransform(ans, RecruiterViewDto);
  }

  @Get("enums")
  async getEnums() {
    const ans = await this.recruiterService.getEnums();

    return ans;
  }

  @Patch()
  @UseInterceptors(TransactionInterceptor)
  async updateRecruiter(@Body() recruiter: UpdateRecruiterDto, @TransactionParam() t: Transaction) {
    const ans = await this.recruiterService.updateRecruiter(recruiter, t);

    return ans;
  }
}
