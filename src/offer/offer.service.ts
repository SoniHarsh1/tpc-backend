import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FindOptions, Transaction } from "sequelize";
import { OFFER_DAO, STUDENT_DAO, ON_CAMPUS_OFFER_DAO, OFF_CAMPUS_OFFER_DAO } from "src/constants";
import { StudentModel, OnCampusOfferModel, OffCampusOfferModel } from "src/db/models";
import { parsePagesize, parseFilter, parseOrder } from "src/utils";

@Injectable()
export class OfferService {
  constructor(
    @Inject(ON_CAMPUS_OFFER_DAO) private onCampusOfferRepo: typeof OnCampusOfferModel,
    @Inject(OFF_CAMPUS_OFFER_DAO) private OffCampusOfferRepo: typeof OffCampusOfferModel
  ) {}

  async deleteOffers(allids: string[]) {
    const offers = await this.onCampusOfferRepo.findAll({
      where: {
        id: allids,
      },
      attributes: ["offerId"],
    });

    const offerIds = offers.map((offer) => offer.id);

    return await this.onCampusOfferRepo.destroy({
      where: { id: offerIds },
    });
  }
}
