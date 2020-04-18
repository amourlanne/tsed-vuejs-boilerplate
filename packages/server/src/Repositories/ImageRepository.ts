import {Repository} from "typeorm";
import {EntityRepository} from "@tsed/typeorm";
import {Image} from "../Entities/Image";

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
}
