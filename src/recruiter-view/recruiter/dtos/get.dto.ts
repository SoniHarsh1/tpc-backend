import {
  NestedEmail,
  NestedEnum,
  NestedNumber,
  NestedObject,
  NestedString,
  NestedUUID,
  NestedUrl,
} from "src/decorators/dto";
import { CompanyCategoryEnum, IndustryDomainEnum } from "src/enums";
import { AddressDto } from "src/job/dtos/jaf.dto";

class UserDto {
  @NestedUUID({})
  id: string;

  @NestedString({})
  name: string;

  @NestedEmail({})
  email: string;

  @NestedString({})
  contact: string;
}

class CompanyDto {
  @NestedUUID({})
  id: string;

  @NestedString({})
  name: string;

  @NestedUrl({ optional: true })
  website?: string;

  @NestedEnum(IndustryDomainEnum, { isArray: true })
  domains: IndustryDomainEnum[];

  @NestedEnum(CompanyCategoryEnum, {})
  category: CompanyCategoryEnum;

  @NestedObject({ type: AddressDto })
  address: AddressDto;

  @NestedNumber({ optional: true })
  size?: number;

  @NestedString({})
  yearOfEstablishment: string;

  @NestedString({ optional: true })
  annualTurnover?: string;

  @NestedUrl({ optional: true })
  socialMediaLink?: string;
}

export class RecruiterViewDto {
  @NestedUUID({})
  id: string;

  @NestedString({})
  designation: string;

  @NestedString({ optional: true })
  landline?: string;

  @NestedObject({ type: UserDto })
  user: UserDto;

  @NestedObject({ type: CompanyDto })
  company: CompanyDto;
}
