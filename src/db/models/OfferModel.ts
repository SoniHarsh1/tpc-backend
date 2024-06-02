import sequelize from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "Offer",
})
export class OfferModel extends Model<OfferModel> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
  })
  id: string;
}
