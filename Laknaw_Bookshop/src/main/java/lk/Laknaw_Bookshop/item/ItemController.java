package lk.Laknaw_Bookshop.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ItemController {

    @Autowired
    private ItemDao itemdao;

    @RequestMapping(value = "/item")
    public ModelAndView itemUI() {

        // get loged user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView itemView = new ModelAndView();
        itemView.addObject("logusername", auth.getName());
        itemView.addObject("title", "Item Management");
        itemView.setViewName("item.html");
        return itemView;
    }

    @GetMapping(value = "/item/alldata", produces = "application/json")
    public List<Item> getAllData() {
        return itemdao.findAll();
    }
}
