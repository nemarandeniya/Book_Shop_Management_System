package lk.Laknaw_Bookshop.item;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GenreController {

    @Autowired
    private GenreDao genredao;

    @GetMapping(value = "/genre/alldata", produces = "application/json")
    public List<Genre> allGenreList() {
        return genredao.findAll();
    }
}
