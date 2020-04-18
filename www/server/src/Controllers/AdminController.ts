import {Controller} from "@tsed/common";
import {AdminUserController} from "./AdminUserController";

@Controller({
    path: "/admin",
    children: [
        AdminUserController
    ]
})
export class AdminController {

}
