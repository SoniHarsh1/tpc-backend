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

class UpdateUserDto {
  @NestedString({ optional: true })
  name?: string;

  @NestedEmail({ optional: true })
  email?: string;

  @NestedString({ optional: true })
  contact?: string;
}

class UpdateCompanyDto {
  @NestedString({ optional: true })
  name?: string;

  @NestedUrl({ optional: true })
  website?: string;

  @NestedEnum(IndustryDomainEnum, { isArray: true, optional: true })
  domains?: IndustryDomainEnum[];

  @NestedEnum(CompanyCategoryEnum, { optional: true })
  category?: CompanyCategoryEnum;

  @NestedObject({ type: AddressDto, optional: true })
  address?: AddressDto;

  @NestedNumber({ optional: true })
  size?: number;

  @NestedString({ optional: true })
  yearOfEstablishment?: string;

  @NestedString({ optional: true })
  annualTurnover?: string;

  @NestedUrl({ optional: true })
  socialMediaLink?: string;
}

export class UpdateRecruiterDto {
  @NestedUUID({})
  id: string;

  @NestedString({ optional: true })
  designation?: string;

  @NestedString({ optional: true })
  landline?: string;

  @NestedObject({ type: UpdateCompanyDto, optional: true })
  company: UpdateCompanyDto;

  @NestedObject({ type: UpdateUserDto, optional: true })
  user: UpdateUserDto;
}
