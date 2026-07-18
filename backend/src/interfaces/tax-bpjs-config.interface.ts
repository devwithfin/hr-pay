export interface TaxBpjsConfigAttributes {
   config_id: number;
   config_name: string;
   pph21_rules: string;
   bpjs_kesehatan_employee_rate: number;
   bpjs_kesehatan_company_rate: number;
   bpjs_tk_jkm_employee_rate: number;
   bpjs_tk_jkm_company_rate: number;
   bpjs_tk_jht_employee_rate: number;
   bpjs_tk_jht_company_rate: number;
   bpjs_tk_jp_employee_rate: number;
   bpjs_tk_jp_company_rate: number;
   bpjs_tk_jkk_company_rate: number;
   effective_start_date: Date;
   effective_end_date: Date;
   createdAt?: Date;
   updatedAt?: Date;
   deletedAt?: Date | null;
}

export type TaxBpjsConfigDTO = Omit<
  TaxBpjsConfigAttributes,
 "config_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
