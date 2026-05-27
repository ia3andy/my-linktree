package io.acme;

import io.quarkiverse.roq.data.runtime.annotations.DataMapping;
import java.util.List;
import java.util.Map;

@DataMapping(value = "trees", type = DataMapping.Type.OBJECT_DIR)
public record Trees(Map<String, Tree> map) {

    public record Tree(String title, String description, List<Link> links) {}

    public record Link(String name, String url, String description, String icon) {}
}
