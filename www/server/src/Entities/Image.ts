import {BeforeRemove, Column, Entity, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {Property} from "@tsed/common";

@Entity("images")
@TableInheritance({ column: { type: "varchar", name: "discr" } })
export class Image {

    protected constructor(path: string, originalName: string, fileName: string, mimeType: string, size: number) {
        this.path = path;
        this.originalName = originalName;
        this.fileName = fileName;
        this.mimeType = mimeType;
        this.size = size;
    }

    @PrimaryGeneratedColumn()
    id: string;

    @Property()
    @Column()
    path: string;

    @Column()
    originalName: string;

    @Property()
    @Column()
    fileName: string;

    @Column()
    mimeType: string;

    @Column()
    size: number;

    @BeforeRemove()
    removeFile() {
        console.log("before remove", this);
    }

    static fromMulterFile(imageFile: Express.Multer.File) {
        return new this('http://localhost:3000/media/' + imageFile.filename, imageFile.originalname, imageFile.filename, imageFile.mimetype, imageFile.size)
    }
}
