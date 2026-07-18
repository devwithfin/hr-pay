import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { TaxBpjsConfigAttributes } from "../interfaces/tax-bpjs-config.interface";

 
interface TaxBpjsConfigCreationAttributes extends Optional<
  TaxBpjsConfigAttributes,
  "config_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class TaxBpjsConfig
  extends Model<TaxBpjsConfigAttributes, TaxBpjsConfigCreationAttributes>
  implements TaxBpjsConfigAttributes
{
  declare config_id: TaxBpjsConfigAttributes["config_id"];
  declare config_name: TaxBpjsConfigAttributes["config_name"];
  declare pph21_rules: TaxBpjsConfigAttributes["pph21_rules"];
  declare bpjs_kesehatan_employee_rate: TaxBpjsConfigAttributes["bpjs_kesehatan_employee_rate"];
  declare bpjs_kesehatan_company_rate: TaxBpjsConfigAttributes["bpjs_kesehatan_company_rate"];
  declare bpjs_tk_jkm_employee_rate: TaxBpjsConfigAttributes["bpjs_tk_jkm_employee_rate"];
  declare bpjs_tk_jkm_company_rate: TaxBpjsConfigAttributes["bpjs_tk_jkm_company_rate"];
  declare bpjs_tk_jht_employee_rate: TaxBpjsConfigAttributes["bpjs_tk_jht_employee_rate"];
  declare bpjs_tk_jht_company_rate: TaxBpjsConfigAttributes["bpjs_tk_jht_company_rate"];
  declare bpjs_tk_jp_employee_rate: TaxBpjsConfigAttributes["bpjs_tk_jp_employee_rate"];
  declare bpjs_tk_jp_company_rate: TaxBpjsConfigAttributes["bpjs_tk_jp_company_rate"];
  declare bpjs_tk_jkk_company_rate: TaxBpjsConfigAttributes["bpjs_tk_jkk_company_rate"];
  declare effective_start_date: TaxBpjsConfigAttributes["effective_start_date"];
  declare effective_end_date: TaxBpjsConfigAttributes["effective_end_date"];
  declare readonly createdAt: TaxBpjsConfigAttributes["createdAt"];
  declare readonly updatedAt: TaxBpjsConfigAttributes["updatedAt"];
  declare readonly deletedAt: TaxBpjsConfigAttributes["deletedAt"];

  static associate(models: any) {}
}

export default function (sequelize: Sequelize) {
  TaxBpjsConfig.init(
    {
      config_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      config_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      pph21_rules: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      bpjs_kesehatan_employee_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_kesehatan_company_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_tk_jkm_employee_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_tk_jkm_company_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_tk_jht_employee_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_tk_jht_company_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_tk_jp_employee_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_tk_jp_company_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      bpjs_tk_jkk_company_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      effective_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      effective_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "TaxBpjsConfig",
      tableName: "tax_bpjs_config",
      paranoid: true,
      timestamps: true,
        underscored: true,
    },
  );

  return TaxBpjsConfig;
}
