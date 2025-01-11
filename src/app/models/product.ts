export class Product {
    constructor(
      public product_id: number,
      public product_name: string,
      public description: string,
      public unit_price: number,
      public in_stock :number,
      public photo :string,
      public discount:number
    ) {}
      
    }

  