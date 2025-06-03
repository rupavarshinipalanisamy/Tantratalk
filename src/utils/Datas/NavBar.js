import { Images } from "../images";
import { ScreenName } from "../screenName";

export const NavBarData=[
    {
        id:1,
        name:"Home",
        navigation:ScreenName.homeScreen,
        img:Images.home
    },
    {
        id:2,
        name:"bookpooja",
        navigation:ScreenName.homeScreen,
        img:Images.bookpooja
    },
    {
        id:3,
        name:"orderhistory",
        navigation:ScreenName.homeScreen,
        img:Images.orderhistory

    },
    {
        id:4,
        name:"wallet",
        navigation:ScreenName.wallet,
        img:Images.payment

    },
    {
        id:5,
        name:"Log out",
        // navigation:ScreenName.wallet,
        img:Images.payment

    }
]