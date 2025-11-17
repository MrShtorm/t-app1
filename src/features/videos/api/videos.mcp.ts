import { Resolver, Tool } from '@nestjs-mcp/server';
import { VideoQueryRepository } from '../infrastructure/repository';
import { CallToolResult } from '@modelcontextprotocol/sdk/types';

@Resolver('status')
export class VideosMcp {
  constructor(private readonly videoQueryRepository: VideoQueryRepository) {}

  @Tool({ name: 'health_check' })
  healthCheck(): CallToolResult {
    return { content: [{ type: 'text', text: 'OK' }] };
  }

  @Tool({ name: 'get_all_count_videos' })
  async getVideos(): Promise<CallToolResult> {
    const result = await this.videoQueryRepository.findAll();
    return {
      content: [
        {
          type: 'text',
          text: `Found ${result.length} videos`,
        },
      ],
    };
  }
}
