import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Transaction, WhereOptions } from "sequelize";
import { RECRUITER_DAO, COMPANY_DAO, USER_DAO } from "src/constants";
import { UserModel, RecruiterModel, CompanyModel } from "src/db/models";
import { UpdateRecruiterDto } from "./dtos/patch.dto";
import { CompanyCategoryEnum, IndustryDomainEnum } from "src/enums";
import { omit } from "lodash";
import sequelize from "sequelize";
@Injectable()
export class RecruiterService {
  constructor(
    @Inject(RECRUITER_DAO) private recruiterRepo: typeof RecruiterModel,
    @Inject(COMPANY_DAO) private companyRepo: typeof CompanyModel,
    @Inject(USER_DAO) private userRepo: typeof UserModel
  ) {}
  async getRecruiter(recruiterId: string) {
    const ans = await this.recruiterRepo.findByPk(recruiterId, {
      include: [
        {
          model: UserModel,
          as: "user",
        },
        {
          model: CompanyModel,
          as: "company",
        },
      ],
    });

    if (!ans) throw new UnauthorizedException(`Recruiter with id ${recruiterId} not found`);

    return ans.get({ plain: true });
  }

  async getEnums() {
    return { Domains: Object.values(IndustryDomainEnum), Category: Object.values(CompanyCategoryEnum) };
  }

  async updateRecruiter(recruiter: UpdateRecruiterDto, t: Transaction) {
    const [recruiterUpdateResult, companyUpdateResult, userUpdateResult] = await Promise.all([
      this.recruiterRepo.update(omit(recruiter, "company", "user"), {
        where: { id: recruiter.id },
        transaction: t,
      }),
      this.companyRepo.update(recruiter.company || {}, {
        where: sequelize.literal(`"id" IN (SELECT "companyId" FROM "Recruiters" WHERE "id" = '${recruiter.id}')`),
        transaction: t,
      }),
      this.userRepo.update(recruiter.user || {}, {
        where: sequelize.literal(`"id" IN (SELECT "userId" FROM "Recruiters" WHERE "id" = '${recruiter.id}')`),
        transaction: t,
      }),
    ]);

    const [recruiterUpdateCount] = recruiterUpdateResult;
    const [companyUpdateCount] = companyUpdateResult;
    const [userUpdateCount] = userUpdateResult;

    return recruiterUpdateCount > 0 || companyUpdateCount > 0 || userUpdateCount > 0 ? [] : [recruiter.id];
  }
}
