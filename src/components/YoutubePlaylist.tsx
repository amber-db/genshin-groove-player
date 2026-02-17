import { motion } from "framer-motion";

interface PlaylistProps {
  title: string;
  playlistId: string;
  description: string;
}

const YoutubePlaylist = ({ title, playlistId, description }: PlaylistProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="genshin-border bg-card rounded-sm overflow-hidden"
    >
      <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg gold-text tracking-wide mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default YoutubePlaylist;
