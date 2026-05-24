package io.acme;

import io.quarkiverse.roq.data.runtime.annotations.DataMapping;
import java.util.List;

@DataMapping("links")
public record Links(Profile profile, List<Link> links) {

    public record Profile(String name, String title, String bio) {}

    public record Link(String name, String url, String description, String icon) {}
}
