#
# install dependencies:
# gem install activesupport
# gem install rspec
# gem install rails_helper
# #

require 'active_support/core_ext/hash'

class TemplatedString
  attr_accessor :template

  def initialize(template)
    @template = template
  end

  def evaluate(variables = {})
    variables = variables.with_indifferent_access # so that symbol works the same as string
    res_str = @template
    template.scan(/{{[\s|\w]*}}/).each do |decl|
      stripped_decl = self.format_declaration(decl)
      value = variables[stripped_decl].to_s
      raise ArgumentError.new("Missing variable #{stripped_decl}, make sure to declare it.") if value.blank?
      res_str.gsub!(decl, value)
    end
    res_str
  end

  protected

  # string without any white characters, ex '{{ fox  }}' => 'fox'
  def format_declaration(decl)
    decl.gsub(/[{|}|\s]*/, '')
  end
end
