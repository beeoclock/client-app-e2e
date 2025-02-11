import { IProductTags } from "./IProductTags";
import {faker} from "@faker-js/faker";
import {NumericUtils} from "../../../../../../../jest/utils/NumericUtils";

export class ProductTagBuilder {
    protected productTag: IProductTags = {
        "object": "TagDto",
        "_id": NumericUtils.generateObjectId(),
        "name": faker.lorem.word().toString(),
        "active": 1
    }

    public setId(id: string): ProductTagBuilder {
        this.productTag._id = id;
        return this;
    }

    public setName(name: string): ProductTagBuilder {
        this.productTag.name = name;
        return this;
    }

    public setActive(active: number): ProductTagBuilder {
        this.productTag.active = active;
        return this;
    }

    public build(): IProductTags {
        return this.productTag;
    }
}