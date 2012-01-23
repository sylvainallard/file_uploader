/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package org.fileuploader;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public final class ContextListener implements ServletContextListener {


    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("*** contextInitialized");   

    }

    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("*** contextDestroyed");
    }
}

