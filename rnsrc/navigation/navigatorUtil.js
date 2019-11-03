/**
 * @author lmy
 * @date 2019/08/04 下午12:37
 * @desc
 */
import React, {Component} from 'react';
import { StackActions } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

export default class NavigatorUtil {
    static navigation =null;
    /**
     * 跳转到指定页面
     * @param page 要跳转的页面名
     * @param params 要传递的参数
     **/
    static pushPage(page, params) {

        if (!this.navigation) {
            console.log('NavigatorUtil.navigation can not be null')
            return;
        }
        const pushAction = StackActions.push({
            routeName: page,
            params
        });
        this.navigation.dispatch(pushAction);

    }

    static navigate(page, params) {
        const navigateAction = NavigationActions.navigate({
            routeName: page,
            params
        });

        this.navigation.dispatch(navigateAction);

    }
    static getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        //如果是一个子导航
        if (route.routes) {
            return this.getCurrentRouteName(route);
        }
        return route.routeName;
    }

    static navigatePage(page, params) {
        const navigation = NavigatorUtil.stackNavigation;
        if (!navigation) {
            console.log('NavigatorUtil.navigation can not be null')
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    /**
     * 返回上一页
     * @param navigation
     */
    static goBack() {
        const backAction = NavigationActions.back({
            key: null,
        });
        this.navigation.dispatch(backAction);
    }



    static onNavigationStateChange(prevState, currentState, action) {

        const currentScreen = NavigatorUtil.getCurrentRouteName(currentState);
        const prevScreen = NavigatorUtil.getCurrentRouteName(prevState);

        if (prevScreen !== currentScreen) {
            let routes = NavigatorUtil.stackContainer.state.nav.routes;

            let length = routes.length;
        }
    }

    //tab的切换事件
    static onTabNavigationStateChange(prevState, currentState, action) {
        //console.log(currentState)
        if (prevState.index !== currentState.index) {
        }
    }


}