package io.acme;

import io.quarkiverse.roq.data.runtime.annotations.DataMapping;
import java.util.List;

@DataMapping("profile")
public record Profile(String name, String handle, String title, String bio,
                       String tree, List<Social> social) {

    public record Social(String name, String url, String icon) {}
}
