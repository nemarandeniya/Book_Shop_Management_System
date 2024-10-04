package lk.Laknaw_Bookshop;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.Laknaw_Bookshop.employee.EmployeeDao;
import lk.Laknaw_Bookshop.privilege.Role;
import lk.Laknaw_Bookshop.privilege.RoleDao;
import lk.Laknaw_Bookshop.user.User;
import lk.Laknaw_Bookshop.user.UserDao;

@RestController
public class LoginController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDao userdao;

    @Autowired
    private EmployeeDao empdao;

    @Autowired
    private RoleDao roledao;

    @RequestMapping(value = "/login")
    public ModelAndView loginUI() {
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("login.html");
        return loginView;
    }

    @RequestMapping(value = "/errorpage")
    public ModelAndView errorpageUI() {
        ModelAndView errorpageView = new ModelAndView();
        errorpageView.setViewName("error.html");
        return errorpageView;
    }

    @RequestMapping(value = "/dashboard")
    public ModelAndView dashboardUI() {

        // get loged user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ModelAndView dashboardView = new ModelAndView();
        dashboardView.addObject("logusername", auth.getName());
        dashboardView.addObject("title", "Dashboard");
        dashboardView.setViewName("dashboard.html");
        return dashboardView;
    }

    @GetMapping(value = "/createadmin")
    public String generateAdmin() {

        User extUser = userdao.getByUsername("Admin");
        if (extUser == null) {

            User adminUser = new User();

            adminUser.setUsername("Admin");
            adminUser.setPassword(bCryptPasswordEncoder.encode("1234"));
            adminUser.setEmail("admin@gmail.com");
            adminUser.setAdded_dateTime(LocalDateTime.now());
            adminUser.setStatus(true);
            adminUser.setEmployee_id(empdao.getReferenceById(2));

            Set<Role> userRoles = new HashSet<>();
            userRoles.add(roledao.getReferenceById(4));
            adminUser.setRoles(userRoles);

            userdao.save(adminUser);
        }
        return "<script>window.location.replace('/login');</script>";
    }
}
